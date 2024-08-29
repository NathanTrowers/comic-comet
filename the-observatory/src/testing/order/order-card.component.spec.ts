import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCardComponent } from 'src/app/order/order-card/order-card.component';

describe('OrderCardComponent', () => {
  let component: OrderCardComponent;
  let fixture: ComponentFixture<OrderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrderCardComponent, HttpClientModule]
    });
    fixture = TestBed.createComponent(OrderCardComponent);
    component = fixture.componentInstance;
    component.comicBookOrder = {
      orderId:        '7263b34d-7f0a-42ad-994a-93b3111c8f34',
      orderDate:      '2024-02-29T20:00:37.105Z',
      returnStatus:   'none',
      comicBook: {
        comicBookId: '7963b34d-7c0a-42cd-964a-93b31e7c8f34',
        name:        'Test Comic Book',
        author:      'Test The Author',
        price:       1.99,
        quantity:    7,
        coverArt:    '',
        carryStatus: 'carrying',
        }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
