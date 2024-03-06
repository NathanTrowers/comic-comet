import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ComicBookService } from 'src/app/comic-book/comic-book.service';
import ComicBookOrder from 'src/app/order/interfaces/ComicBookOrder';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent {
  @Input() comicBookOrder!: ComicBookOrder;
  @Output() returnComicBookOrderEvent: EventEmitter<ComicBookOrder> = new EventEmitter<ComicBookOrder>;
  comicBookService: ComicBookService;

  constructor(comicBookService: ComicBookService) {
    this.comicBookService = comicBookService;
  }

  getFormattedDate(unformattedDate: string): Date {
    return new Date(Date.parse(this.comicBookOrder?.orderDate));
  }

  returnComicBook(): void {
    this.returnComicBookOrderEvent.emit(this.comicBookOrder);
  }
}
