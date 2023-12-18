import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CartService } from 'src/app/cart/cart.service';
import { CartItemComponent } from 'src/app/cart/cart-item/cart-item.component';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';
import { infoMessages } from 'src/app/message/message.constants';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartItemComponent,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart!: ComicBook[];
  emptyCartMessage: string = infoMessages.EMPTY_CART;

  constructor(private cartService: CartService) {
    this.cartService.checkCart();
    this.cart = this.cartService.cart;
  }
}
