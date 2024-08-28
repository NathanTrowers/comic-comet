import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MessageComponent } from 'src/app/message/message.component';
import { errorMessage, messageClass } from 'src/app/message/message.constants';
import { MessageService } from 'src/app/message/message.service';
import { OrderService } from 'src/app/order/order.service';
import ComicBookOrder from 'src/app/order/interfaces/ComicBookOrder';
import OrderReturn from 'src/app/order/interfaces/OrderReturn';
import SavedComicBookOrdersListResponse from 'src/app/order/interfaces/SavedComicBookOrdersListResponse';
import { OrderCardComponent } from 'src/app/order/order-card/order-card.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    MessageComponent,
    OrderCardComponent,
    RouterModule
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  RETURN_STATUS: string = 'return';

  orderList: ComicBookOrder[] = [];
  filteredOrderList: ComicBookOrder[] = [];
  confirmReturn: boolean = false;
  returnedOrder!: ComicBookOrder;

  constructor(private messageService: MessageService, private orderService: OrderService) {}

  ngOnInit(): void {
      this.orderService.getPastOrders()
        .subscribe((receivedPastOrders: SavedComicBookOrdersListResponse) => {
          this.orderList = receivedPastOrders._embedded.savedComicBookOrderList;
          this.filteredOrderList = receivedPastOrders._embedded.savedComicBookOrderList;
        });
  }
  
  filterResults(searchQuery: string): void {
    if (!searchQuery) {
      this.filteredOrderList = this.orderList;
    }
    
    this.filteredOrderList = this.orderList.filter((comicBookOrder: ComicBookOrder) => {
        return comicBookOrder.comicBook?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  showConfirmReturnDialog(orderToReturn: ComicBookOrder): void {
    this.confirmReturn = true;
    this.returnedOrder = orderToReturn;
  }

  return(): void {
    let orderReturnForm: OrderReturn = {
      comicBookId:    this.returnedOrder.comicBook.comicBookId,
      returnStatus:   this.RETURN_STATUS
    }

    this.orderService.submitReturnOfOrder(this.returnedOrder.orderId, orderReturnForm)
      .subscribe((received:any) => {
        if (received.status === 202) {
          let placeholder: ComicBookOrder[] = this.orderList.map((comicBookOrder: ComicBookOrder) => {
            if (comicBookOrder.comicBook?.comicBookId === this.returnedOrder.comicBook.comicBookId
              && comicBookOrder.orderId === this.returnedOrder.orderId
            ) {
              comicBookOrder.returnStatus = this.RETURN_STATUS;
            }
            
            return comicBookOrder;
          });

          this.orderList = placeholder;
          this.filteredOrderList = this.orderList;

          return;
        }

        this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_GENERIC);
      });

      this.confirmReturn = false;
  }
}
