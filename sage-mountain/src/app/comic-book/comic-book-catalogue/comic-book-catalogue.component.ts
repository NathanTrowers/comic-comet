import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import ComicBook from 'src/app/comic-book/interfaces/ComicBook';
import ComicBookCatalogue from 'src/app/comic-book/interfaces/ComicBookCatalogue';
import { ComicBookCardComponent } from 'src/app/comic-book/comic-book-card/comic-book-card.component';
import { ComicBookService } from 'src/app/comic-book/comic-book.service';
import { MessageComponent } from 'src/app/message/message.component';
import { MessageService } from 'src/app/message/message.service';
import { errorMessage, messageClass } from 'src/app/message/message.constants';

@Component({
  selector: 'app-comic-book-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    ComicBookCardComponent,
    MessageComponent
  ],
  templateUrl: './comic-book-catalogue.component.html',
  styleUrls: ['./comic-book-catalogue.component.css']
})
export class ComicBookCatalogueComponent {
  comicBookList: ComicBook[] = [];
  filteredComicBookList: ComicBook[] = [];
  confirmDelete: boolean = false;
  deletionCandidate!: ComicBook;

  constructor(private comicBookService: ComicBookService, private messageService: MessageService) {
    this.messageService = messageService;
    
    this.comicBookService.getComicBookCatalogue()
      .subscribe((receivedComicBooks: ComicBookCatalogue) =>{
        this.comicBookList = receivedComicBooks._embedded.comicBookList;
        this.filteredComicBookList = receivedComicBooks._embedded.comicBookList;
      });
  }

  filterResults(searchQuery: string) {
    if (!searchQuery) {
      this.filteredComicBookList = this.comicBookList;
    }
    this.filteredComicBookList = this.comicBookList.filter((comicBook: ComicBook) => {
        return comicBook?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  showConfirmDeleteDialog(comicBook: ComicBook): void {
    this.confirmDelete = true;
    this.deletionCandidate = comicBook;
  }

  delete(): void {
    this.comicBookList  = this.comicBookList.filter((book: ComicBook) => book !== this.deletionCandidate);
    this.filteredComicBookList = this.comicBookList;
    this.confirmDelete = false;

    this.comicBookService.submitDeleteComicBookRequest(this.deletionCandidate.comicBookId)
      .subscribe((received: any) => {
        if (received.status === 202) {
          return;
        }

        this.comicBookList.push(this.deletionCandidate);
        this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_GENERIC);
      });     
  }
}
