import { ComicBookValidator } from "src/app/comic-book/comic-book.validator";
import NewComicBookForm from "src/app/comic-book/interfaces/NewComicBookForm";

describe('Test Suite for ComicBookValidator', () => {
    let testData: NewComicBookForm;
    let comicBookValidator: ComicBookValidator;

    beforeEach(() => {
        testData = {
            name:        'Example Book Name',
            author:      'Example Book Author',
            price:       29.99,
            quantity:    7,
            coverArt:    '',
            carryStatus: 'carrying',
          } 
        
          comicBookValidator = new ComicBookValidator();
    });

    it('tests "validate" returns "true" when input is valid', () => {
        /** Call to Test */
        let response: boolean = comicBookValidator.validate(testData);

        /** Expectation */
        expect(response).toBeTrue();
    });

    it('tests "validate" returns "false" when the name is invalid #1', () => {
        /** Data */
        testData.name = 'Ex@mple Name';

        /** Call to Test */
        let response: boolean = comicBookValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when the name is invalid #2', () => {
        /** Data */
        testData.name = '{injectionAttack: malice}';

        /** Call to Test */
        let response: boolean = comicBookValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });

    it('tests "validate" returns "false" when the author is invalid #1', () => {
        /** Data */
        testData.author = 'Ex@mple Auth#r';

        /** Call to Test */
        let response: boolean = comicBookValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when the author is invalid #2', () => {
        /** Data */
        testData.author = '(DROP TABLE comic_book)';

        /** Call to Test */
        let response: boolean = comicBookValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });

    it('tests "validate" returns "false" when the price is invalid #1', () => {
        /** Data */
        testData.price = 9999.00;

        /** Call to Test */
        let response: boolean = comicBookValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when the price is invalid #2', () => {
        /** Data */
        testData.price = 999.777;

        /** Call to Test */
        let response: boolean = comicBookValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });

    it('tests "validate" returns "false" when the quantity is invalid #1', () => {
        /** Data */
        testData.quantity = -1;

        /** Call to Test */
        let response: boolean = comicBookValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when the quantity is invalid #2', () => {
        /** Data */
        testData.quantity = 9999;

        /** Call to Test */
        let response: boolean = comicBookValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
});
