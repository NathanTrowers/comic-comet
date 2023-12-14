import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ComicBookService } from 'src/app/comic-book/comic-book.service';
import { ComicBookValidator } from 'src/app/comic-book/comic-book.validator';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';
import EditedComicBook from 'src/app/comic-book/interfaces/EditedComicBook';
import { InfoComponent } from 'src/app/message/info/info.component';
import { MessageComponent } from 'src/app/message/message.component';
import { errorMessage, formMessages, messageClass } from 'src/app/message/message.constants';
import { MessageService } from 'src/app/message/message.service';

@Component({
  selector: 'app-edit-comic-book',
  standalone: true,
  imports: [
    CommonModule,
    InfoComponent,
    ReactiveFormsModule,
    MessageComponent,
    RouterModule
  ],
  templateUrl: './edit-comic-book.component.html',
  styleUrls: ['./edit-comic-book.component.css']
})
export class EditComicBookComponent implements OnInit  {
  comicBook!: ComicBook;
  oldComicBook!: ComicBook;
  updateComicBookForm: FormGroup = new FormGroup({
    name:         new FormControl(),
    author:       new FormControl(),
    price:        new FormControl(),
    quantity:     new FormControl(),
    carryStatus:  new FormControl()
  });
  coverArt: string = '';
  messages = formMessages;

  constructor(
    private authenticationService: AuthenticationService, 
    private comicBookService: ComicBookService,
    private comicBookValidator: ComicBookValidator,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.authenticationService = authenticationService;
    this.comicBookService = comicBookService;
    this.comicBookValidator = comicBookValidator;
    this.messageService = messageService;
    this.route = route;
    this.router = router;
  }

  ngOnInit(): void {
    const comicBookId: string = String(this.route.snapshot.paramMap.get('id'));
    this.comicBookService.getComicBookById(comicBookId)
      .subscribe( comicBook => {
        this.comicBook = comicBook;
        this.oldComicBook = comicBook;
        this.updateComicBookForm = new FormGroup({
          name:         new FormControl(comicBook.name),
          author:       new FormControl(comicBook.author),
          price:        new FormControl(comicBook.price),
          quantity:     new FormControl(comicBook.quantity),
          carryStatus:  new FormControl(comicBook.carryStatus)
        });

        Promise.resolve(this.onFileSelected(comicBook.coverArt))
          .catch(silentError => silentError);
      });
  }

  onSubmitUpdatedComicBook(): void {
    const comicBookToUpdate: EditedComicBook = {
      comicBookId:  this.comicBook.comicBookId,
      name:         this.updateComicBookForm.value.name ?? '',
      author:       this.updateComicBookForm.value.author ?? '',
      price:        Number.parseFloat(this.updateComicBookForm.value.price ?? '0.00'),
      quantity:     Number.parseInt(this.updateComicBookForm.value.quantity ?? '0'),
      coverArt:     this.coverArt,
      carryStatus:  this.updateComicBookForm.value.carryStatus ?? '',
    }

    if (this.comicBookValidator.validate(comicBookToUpdate)) {
      if (this.areComicBooksEqual(comicBookToUpdate)) {
        this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_NO_CHANGE_DETECTED);

        return;
      }

      this.comicBookService.submitUpdatedComicBook(comicBookToUpdate)
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

  private areComicBooksEqual(comicBookToUpdate: EditedComicBook): boolean  {
    if (
      this.oldComicBook.name === comicBookToUpdate.name
      && this.oldComicBook.author === comicBookToUpdate.author
      && this.oldComicBook.price === comicBookToUpdate.price
      && this.oldComicBook.quantity === comicBookToUpdate.quantity
      && this.oldComicBook.coverArt === comicBookToUpdate.coverArt
      && this.oldComicBook.carryStatus === comicBookToUpdate.carryStatus
    ) {
      return true;
    }

    return false;
  }
}
