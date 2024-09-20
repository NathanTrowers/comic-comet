import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from 'src/app/cart/cart-item/cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [CartItemComponent],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.cartItem = {
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
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
