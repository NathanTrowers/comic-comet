import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { CartService } from 'src/app/cart/cart.service';
import { OrderConfirmationComponent } from 'src/app/order/order-confirmation/order-confirmation.component';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let activateRouteStub: Partial<ActivatedRoute>

  beforeEach(() => {
    const cartService = jasmine.createSpyObj(
      'CartService', 
      {
        'checkCart': null,
        'remove': null
      }, 
      {
        cart: [
          {
            comicBookId: '7963b34d-7c0a-42cd-964a-93b31e7c8f34',
            name:        'Test Comic Book',
            author:      'Test The Author',
            price:       1.99,
            quantity:    7,
            coverArt:    '',
            carryStatus: 'carrying',
            _links: {
              self: {
                  href: 'http/localhost:8090/comic-book/7963b34d-7c0a-42cd-964a-93b31e7c8f34'
              },
              comicBooks: {
                  "href": 'http/localhost:8090/comic-books'
              }
            }
          }
        ]
      }
    );

    TestBed.configureTestingModule({
      imports: [OrderConfirmationComponent, HttpClientModule],
      providers: [
        { provide:  ActivatedRoute, useValue: activateRouteStub },
        { provide: CartService, useValue: cartService }
      ]
    });
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
