import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from "rxjs";

import { ComicBookService } from "src/app/comic-book/comic-book.service";
import { EditComicBookComponent } from 'src/app/comic-book/edit-comic-book/edit-comic-book.component';

describe('EditComicBookComponent', () => {
  let component: EditComicBookComponent;
  let fixture: ComponentFixture<EditComicBookComponent>;
  let getComicBookByIdSpy;

  beforeEach(() => {
    const comicBookService = jasmine.createSpyObj('ComicBookService', ['getComicBookById']);
    getComicBookByIdSpy = comicBookService.getComicBookById.and.returnValue(of({
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
    }));
    
    TestBed.configureTestingModule({
    imports: [EditComicBookComponent],
    providers: [
        { provide: ActivatedRoute, useValue: {
                snapshot: {
                    paramMap: {
                        get: (id: number) => {
                            id: '7963b34d-7c0a-42cd-964a-93b31e7c8f34';
                        }
                    }
                }
            } },
        { provide: ComicBookService, useValue: comicBookService },
        provideHttpClient(withInterceptorsFromDi())
    ]
});
    fixture = TestBed.createComponent(EditComicBookComponent);
    component = fixture.componentInstance;
    component.comicBook = {
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
