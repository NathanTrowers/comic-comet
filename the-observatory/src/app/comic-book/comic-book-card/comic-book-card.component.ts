import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CartService } from 'src/app/cart/cart.service';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';

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

  constructor(private cartService: CartService, private route: ActivatedRoute) {}

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

  getSrcString(): string {
    if (this.comicBook?.coverArt?.length > 0) {
      const coverArtString: string = this.comicBook.coverArt?.toString() ?? '';

      return `data:image/png;base64,${coverArtString}`;
    }
    
    return '';
  }
}
