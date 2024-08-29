import { OrrderValidator } from "src/app/order/order.validator";
import Address from "src/app/order/interfaces/Address"

describe('Test Suite for OrderValidator', () => {
    let orderValidator: OrrderValidator;

    describe('Testing the "validateAddress" method', () => {
        let testData: Address;

        beforeEach(() => {
            testData = {
                address: '10 Superhero Way',
                city: 'Sky City',
                postalCode: 'm2z 9p9',
                country: 'Canada'
            }

            orderValidator = new OrrderValidator();
        });

        it('returns "true" when input is valid', () => {
            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeTrue();
        });
        it('returns "true" when postal code is uppercase is valid', () => {
            /** Data */
            testData.postalCode = 'M2Z 9P9';

            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeTrue();
        });

        it('returns "false" when address is invalid #1', () => {
            /** Data */
            testData.address = '!0 Superhero Way';

            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeFalse();
        });
        it('returns "false" when address is invalid #2', () => {
            /** Data */
            testData.address = 'DROP TABLE customer;';

            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeFalse();
        });

        it('returns "true" when city is invalid #1', () => {
            /** Data */
            testData.city = 'Sk5 City';

            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeFalse();
        });
        it('returns "true" when city is invalid #2', () => {
            /** Data */
            testData.city = 'SELECT * FROM customer;';

            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeFalse();
        });

        it('returns "true" when postalCode is invalid #1', () => {
            /** Data */
            testData.postalCode = 'M2Z 9P99';

            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeFalse();
        });
        it('returns "true" when postalCode is invalid #2', () => {
            /** Data */
            testData.postalCode = 'ALTER TABLE customer ADD virus BLOB;';

            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeFalse();
        });

        it('returns "true" when country is invalid #1', () => {
            /** Data */
            testData.country = 'Guinea_Burneau';
            
            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeFalse();
        });
        it('returns "true" when country is invalid #2', () => {
            /** Data */
            testData.country = 'ALTER TABLE customer DROP customer_id;';

            /** Call to Test */
            let response: boolean = orderValidator.validateAddress(testData);

            /** Expectation */
            expect(response).toBeFalse();
        });
    });
});
