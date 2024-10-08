import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ComicBookService } from 'src/app/comic-book/comic-book.service';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';

describe('Comic Book Service Test Suite', () => {
    let comicBookService: ComicBookService;
    let comicBook: ComicBook;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
        comicBookService = TestBed.inject(ComicBookService);
        comicBook = {
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
    });

    it('tests that the ComicBookService is created', ()  => {
        /** Expectation */
        expect(comicBookService).toBeDefined();
    });

    it('tests "getSrcString" returns an the "Cover Coming Soon" image path when no cover art is given', ()  => {
        /** Call to Test */
        let result: string = comicBookService.getSrcString(comicBook.coverArt);

        /** Expectation */
        expect(result).toEqual('/assets/cover-coming-soon.png');
    });

    it('tests "getSrcString" returns an encoded image string when a cover art string is given', ()  => {
        /** Data */
        comicBook.coverArt = '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';
        let expectedResult: string = `data:image/png;base64,${comicBook.coverArt}`;

        /** Call to Test */
        let result: string = comicBookService.getSrcString(comicBook.coverArt);

        /** Expectation */
        expect(result).toEqual(expectedResult);
    });
});

