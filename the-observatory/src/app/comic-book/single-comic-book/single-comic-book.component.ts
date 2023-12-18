import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CartService } from 'src/app/cart/cart.service';
import { ComicBookService } from 'src/app/comic-book/comic-book.service';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';
import { FooterComponent } from 'src/app/footer/footer.component';

@Component({
  selector: 'app-single-comic-book',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './single-comic-book.component.html',
  styleUrls: ['./single-comic-book.component.css']
})
export class SingleComicBookComponent implements OnInit {
  comicBook!: ComicBook;
  cartItem: boolean = false;
  comicBookService: ComicBookService;

  constructor(
    private cartService: CartService, 
    comicBookService: ComicBookService,
    private route: ActivatedRoute
  ) {
    this.comicBookService = comicBookService;
    this.route = route;
  }

  ngOnInit(): void {
    const comicBookId: string = String(this.route.snapshot.paramMap.get('id'));
    this.comicBookService.getComicBookById(comicBookId)
      .subscribe( (comicBook: ComicBook) => {
        this.comicBook = comicBook;
      });

    if (this.cartService.isInCart(comicBookId)) {
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
