import { HttpClientModule } from "@angular/common/http";
import { TestBed } from '@angular/core/testing';

import { CartService } from 'src/app/cart/cart.service';
import ComicBook from "src/app/comic-book/interfaces/ComicBook";

describe('CartService Test Suite', () => {
  let cartService: CartService;
  let comicBook: ComicBook = {
    comicBookId: '7963b34d-7c0a-42cd-964a-93b31e7c8f34',
    name:        'Test Comic Book',
    author:      'Test The Author',
    price:       1.99,
    quantity:    7,
    coverArt:    '',
    carryStatus: 'carrying',
    _links: {
      self: {
          href: 'http/localhost:8090/comic-books/7963b34d-7c0a-42cd-964a-93b31e7c8f34'
      },
      comicBooks: {
          "href": 'http/localhost:8090/comic-books'
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    cartService = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });

  it('tests "isInCart" returns "true" when a comic book is in the cart', () => {
    /** Data */
    cartService.add(comicBook);

    /** Mocks*/
    spyOn(localStorage, 'getItem').and.returnValue(comicBook.comicBookId);
    
    /** Call to Test*/
    let result: boolean = cartService.isInCart(comicBook.comicBookId);

    /** Expectation */
    expect(result).toBeTruthy();
  });

  it('tests "isInCart" returns "false" when a comic book is not in the cart', () => {
    /** Data */
    cartService.add(comicBook);

    /** Mocks*/
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    /** Call to Test*/
    let result: boolean = cartService.isInCart('6963e34d-7c1a-42dd-974a-93b31f7c8f35');

    /** Expectation */
    expect(result).toBeFalsy();
  });

  it('tests "checkCart" attempts to get comic books from the back-end when both the cart and the local storage are empty', () => {
    /** Mocks */
    spyOn(localStorage, 'getItem').and.returnValue(comicBook.comicBookId);
    
    const comicBookService = jasmine.createSpyObj('ComicBookService', ['getComicBookById']);
    
    /** Call to Test */
    cartService.checkCart();

    /** Expectation */
    expect(comicBookService.getComicBookById).not.toHaveBeenCalled();
  });
});
