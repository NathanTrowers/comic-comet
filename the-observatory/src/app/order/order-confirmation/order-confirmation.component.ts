import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { CartService } from 'src/app/cart/cart.service';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';
import { MessageComponent } from 'src/app/message/message.component';
import { errorMessage, messageClass } from 'src/app/message/message.constants';
import { MessageService } from 'src/app/message/message.service';
import { OrderService } from 'src/app/order/order.service';
import Order from 'src/app/order/interfaces/Order';
import { JWTParser } from 'src/app/order/order-confirmation/JWTParser';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    MessageComponent,
    RouterModule
  ],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit{
  itemsToPurchase: ComicBook[] = [];
  subTotal: number = 0;
  subTotalString: string = '0.00';
  tax: number = 0.12;
  taxAmount: number = 0;
  total: string = '0.00';

  constructor(
    private cartService: CartService,
    private jwtParser: JWTParser,
    private messageService: MessageService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.checkCart();
    this.itemsToPurchase = this.cartService.cart;

    this.itemsToPurchase[0];
    this.itemsToPurchase.map( (item: ComicBook) =>  {
      this.subTotal += item.price;
    });
    
    this.subTotalString = this.subTotal.toFixed(2);
    const taxPlaceholder: number = this.subTotal * this.tax;
    this.taxAmount = Number.parseFloat(taxPlaceholder.toFixed(2));
    const totalPlaceholder: number = this.subTotal + this.taxAmount;
    this.total = totalPlaceholder.toFixed(2);
  }

  onSubmitOrder(): void {
    let orderId = uuidv4();
    let newOrder: Order[] = [];

    this.itemsToPurchase.forEach( (item: ComicBook) =>  {
      let orderItem: Order = {
        orderId:        orderId,
        comicBookId:    item.comicBookId,
        customerId:     this.jwtParser.getCustomerId(),
        orderDate:      new Date().toISOString(),
        returnStatus:   'none'
      }

      newOrder.push(orderItem);
      
      this.cartService.remove(item);
    });

    this.orderService.postOrder(newOrder)
      .subscribe( (response: any) => {
        if (response._embedded.length !== newOrder.length) {
          this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_GENERIC);              
          
          return;
        }
        this.router.navigate(['/comic-books']);            
      });
  }
}
