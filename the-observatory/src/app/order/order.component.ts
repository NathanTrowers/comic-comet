import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrderService } from 'src/app/order/order.service';
import ComicBookOrder from 'src/app/order/interfaces/ComicBookOrder';
import SavedComicBookOrdersListResponse from 'src/app/order/interfaces/SavedComicBookOrdersListResponse';
import { OrderCardComponent } from 'src/app/order/order-card/order-card.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    OrderCardComponent,
    RouterModule
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderList: ComicBookOrder[] = [];
  filteredOrderList: ComicBookOrder[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
      this.orderService.getPastOrders()
        .subscribe((receivedPastOrders: SavedComicBookOrdersListResponse) => {
          this.orderList = receivedPastOrders._embedded.savedComicBookOrderList;
          this.filteredOrderList = receivedPastOrders._embedded.savedComicBookOrderList;
        });
  }
  
  filterResults(searchQuery: string) {
    if (!searchQuery) {
      this.filteredOrderList = this.orderList;
    }
    
    this.filteredOrderList = this.orderList.filter((comicBookOrder: ComicBookOrder) => {
        return comicBookOrder.comicBook?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }
}
