import { ContactFormValidator } from 'src/app/contact-us/contact-form.validdator';
import Correspondence from 'src/app/contact-us/interfaces/Correspondence';

describe('Test Suite for ContactFormValidator', () => {
    let testData: Correspondence;
    let contactFormValidator: ContactFormValidator;

    beforeEach(() => {
        testData = {
            subject:    'Example Subject',
            text:       'Example Text 1!'
        }

        contactFormValidator = new ContactFormValidator();
    });

    it('tests "validate" returns "true" when input is valid', () => {
        /** Call to Test */
        let response: boolean = contactFormValidator.validate(testData);

        /** Expectation */
        expect(response).toBeTrue();
    });


    it('tests "validate" returns "false" when subject is invlid #1', () => {
        /** Data */
        testData.subject = 'Ex@mple Subject';

        /** Call to Test */
        let response: boolean = contactFormValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when subject is invlid #2', () => {
        /** Data */
        testData.subject = 'Example Subjec^';

        /** Call to Test */
        let response: boolean = contactFormValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });


    it('tests "validate" returns "false" when text is invlid #1', () => {
        /** Data */
        testData.text = 'Example Tex~';

        /** Call to Test */
        let response: boolean = contactFormValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when text is invlid #2', () => {
        /** Data */
        testData.text = 'Example T{`}xt';

        /** Call to Test */
        let response: boolean = contactFormValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });

});
