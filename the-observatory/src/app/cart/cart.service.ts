import { Injectable } from '@angular/core';

import { ComicBookService } from 'src/app/comic-book/comic-book.service';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';
import { errorMessage, messageClass } from 'src/app/message/message.constants';
import { MessageService } from 'src/app/message/message.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart: ComicBook[] = [];
  
  constructor(private messageService: MessageService, private comicBookService: ComicBookService) { }

  checkCart(): void {
    if (this.cart.length === 0 && localStorage.length !== 0) {
      let comicBookId: string = '';
      for (let iterator: number = 0; iterator < localStorage.length; iterator++) {
        comicBookId = String(localStorage.key(iterator));
        this.comicBookService.getComicBookById(comicBookId)
          .subscribe( (comicBook: ComicBook) => {
            this.cart.push(comicBook);
          });
      }
    }
  }

  add(comicBook: ComicBook): void {
    this.cart.push(comicBook);

    try { localStorage.setItem(`${comicBook.comicBookId}`, comicBook.comicBookId); }
    catch(error: any) { this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_ADD_TO_CART_FAILED); }
  }

  remove(deletionCandidate: ComicBook): void {
    this.cart = this.cart.filter((comicBook: ComicBook) => comicBook !== deletionCandidate);
    localStorage.removeItem(`${deletionCandidate.comicBookId}`);
  }

  isInCart(comicBookId: string): boolean {
    let storedComicBookId: string | null = localStorage.getItem(comicBookId);
    let singleComicBook = this.cart.filter((comicBook: ComicBook) => comicBook.comicBookId === storedComicBookId);
    if (singleComicBook.length > 0) {
      return true;
    }

    return false;
  }
}
