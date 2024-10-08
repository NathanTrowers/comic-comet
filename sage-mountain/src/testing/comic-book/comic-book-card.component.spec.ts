import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ComicBookCardComponent } from 'src/app/comic-book/comic-book-card/comic-book-card.component';

describe('ComicBookCardComponent', () => {
  let component: ComicBookCardComponent;
  let fixture: ComponentFixture<ComicBookCardComponent>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComicBookCardComponent, RouterModule],
      providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub }]
    });
    fixture = TestBed.createComponent(ComicBookCardComponent);
    component = fixture.componentInstance;
    component.comicBook = {
      comicBookId:  '7963b34d-7c0a-42cd-964a-93b31e7c8f34',
      name:         'Test Comic Book',
      author:       'Test The Author',
      price:        1.99,
      quantity:     7,
      coverArt:     '',
      carryStatus:  'carrying',
      _links: {
        self: {
            href: 'http/localhost:8090/comic-books/7963b34d-7c0a-42cd-964a-93b31e7c8f34'
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
