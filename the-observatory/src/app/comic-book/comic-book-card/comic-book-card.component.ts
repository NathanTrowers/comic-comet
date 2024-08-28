import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CartService } from 'src/app/cart/cart.service';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';
import { ComicBookService } from 'src/app/comic-book/comic-book.service';

@Component({
  selector: 'app-comic-book-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './comic-book-card.component.html',
  styleUrls: ['./comic-book-card.component.css']
})
export class ComicBookCardComponent implements OnInit {
  @Input() comicBook!: ComicBook;
  cartItem: boolean = false;
  comicBookService: ComicBookService;

  constructor(private cartService: CartService, comicBookService: ComicBookService) {
    this.comicBookService = comicBookService;
  }

  ngOnInit(): void {
    if (this.cartService.isInCart(this.comicBook.comicBookId)) {
      this.cartItem = true;
    }
  }

  addToCart(): void {
    this.cartItem = true;
    this.cartService.add(this.comicBook);
  }

  removeFromCart(): void {
    this.cartItem = false;
    this.cartService.remove(this.comicBook);
  }
}
