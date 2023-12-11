import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ComicBookService } from 'src/app/comic-book/comic-book.service';
import { ComicBookValidator } from 'src/app/comic-book/comic-book.validator';
import NewComicBookForm from 'src/app/comic-book/interfaces/NewComicBookForm';
import { formMessages } from 'src/app/message/message.constants';
import { InfoComponent } from 'src/app/message/info/info.component';
import { MessageComponent } from 'src/app/message/message.component';
import { errorMessage, messageClass } from 'src/app/message/message.constants';
import { MessageService } from 'src/app/message/message.service';


@Component({
  selector: 'app-new-comic-book',
  standalone: true,
  imports: [
    CommonModule,
    InfoComponent,
    ReactiveFormsModule,
    MessageComponent,
    RouterModule
  ],
  templateUrl: './new-comic-book.component.html',
  styleUrls: ['./new-comic-book.component.css']
})
export class NewComicBookComponent {
  newComicBookForm = new FormGroup({
    name:         new FormControl(''),
    author:       new FormControl(''),
    price:        new FormControl(''),
    quantity:     new FormControl(''),
    carryStatus:  new FormControl('')
  });
  coverArt: string = '';
  messages = formMessages;

  constructor(
    private authenticationService: AuthenticationService, 
    private comicBookService: ComicBookService,
    private comicBookValidator: ComicBookValidator,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmitNewComicBook(): void {
    const comicBookToAdd: NewComicBookForm = {
      name: this.newComicBookForm.value.name ?? '',
      author: this.newComicBookForm.value.author ?? '',
      price:Number.parseFloat(this.newComicBookForm.value.price ?? '0.00'),
      quantity: Number.parseInt(this.newComicBookForm.value.quantity ?? '0'),
      coverArt: this.coverArt,
      carryStatus: this.newComicBookForm.value.carryStatus ?? '',
    }

    if (this.comicBookValidator.validate(comicBookToAdd)) {
      this.comicBookService.submitNewComicBook(comicBookToAdd)
        .subscribe(received => {
          if (typeof received?.comicBookId !== 'undefined') {
            this.router.navigate([this.authenticationService.redirectUrl]);

            return;
          }
    
          this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_GENERIC);
        });
    } else {
      this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_WRONG_INPUT);
    }
  }
  
  async onFileSelected(event: any): Promise<void> {
    const file: File = event.target.files[0];

    if(file) {
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const url = fileReader.result ?? '';
        const urlString = url.toString();
        
        const BASE64_MARKER: string = ';base64,';
        const base64Index = urlString.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        let base64 = urlString.substring(base64Index);

        this.coverArt = base64;
      }
    }
  }
}
