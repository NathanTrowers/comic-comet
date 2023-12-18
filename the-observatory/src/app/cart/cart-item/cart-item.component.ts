import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import ComicBook from 'src/app/comic-book/interfaces/ComicBook';
import { ComicBookService } from 'src/app/comic-book/comic-book.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['../cart.component.css', './cart-item.component.css']
})
export class CartItemComponent {
  @Input() cartItem!: ComicBook;
  comicBookService: ComicBookService;

  constructor(comicBookService: ComicBookService) {
    this.comicBookService = comicBookService;
  }
}
