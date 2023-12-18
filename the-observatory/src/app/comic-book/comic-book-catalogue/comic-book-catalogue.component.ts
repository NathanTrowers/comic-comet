import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CartService } from 'src/app/cart/cart.service';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';
import ComicBookCatalogue from 'src/app/comic-book/interfaces/ComicBookCatalogue';
import { ComicBookCardComponent } from 'src/app/comic-book/comic-book-card/comic-book-card.component';
import { ComicBookService } from 'src/app/comic-book/comic-book.service';

@Component({
  selector: 'app-comic-book-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    ComicBookCardComponent
  ],
  templateUrl: './comic-book-catalogue.component.html',
  styleUrls: ['./comic-book-catalogue.component.css']
})
export class ComicBookCatalogueComponent {
  comicBookList: ComicBook[] = [];
  filteredComicBookList: ComicBook[] = [];

  constructor(private cartService: CartService, private comicBookService: ComicBookService) {
    this.comicBookService.getComicBookCatalogue()
      .subscribe((receivedComicBooks: ComicBookCatalogue) =>{
        this.comicBookList = receivedComicBooks._embedded.comicBookList;
        this.filteredComicBookList = receivedComicBooks._embedded.comicBookList;
      });
      
    this.cartService.checkCart();
  }

  filterResults(searchQuery: string) {
    if (!searchQuery) {
      this.filteredComicBookList = this.comicBookList;
    }
    this.filteredComicBookList = this.comicBookList.filter((comicBook: ComicBook) => {
        return comicBook?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }
}
