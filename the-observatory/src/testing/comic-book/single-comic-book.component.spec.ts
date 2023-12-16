import { HttpClientModule } from "@angular/common/http"
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from "rxjs";

import { ComicBookService } from "src/app/comic-book/comic-book.service";
import { SingleComicBookComponent } from 'src/app/comic-book/single-comic-book/single-comic-book.component';

describe('SingleComicBookComponent', () => {
  let component: SingleComicBookComponent;
  let fixture: ComponentFixture<SingleComicBookComponent>;
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
      imports: [HttpClientModule, SingleComicBookComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { 
          snapshot: {
            paramMap: {
              get: (id:number) => {
                id:'7963b34d-7c0a-42cd-964a-93b31e7c8f34'
              }
            }
          }
        } },
        { provide: ComicBookService, useValue: comicBookService }
      ]
    });
    fixture = TestBed.createComponent(SingleComicBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
