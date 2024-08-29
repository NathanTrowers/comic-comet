import { LoginValidator } from 'src/app/authentication/login/login.validator';
import LoginCredentials from 'src/app/authentication/interfaces/request/LoginCredentials';

describe('Test Suite for LoginValidator', () => {
    let testData: LoginCredentials;
    let loginValidator: LoginValidator;

    beforeEach(() => {
        testData = {
            email:    'validemail@test.com',
            password: 'Val!dP@$%w0rd'
          } 
        
        loginValidator = new LoginValidator();
    });

    it('tests "validate" returns "true" when input is valid', () => {
        /** Call to Test */
        let response: boolean = loginValidator.validate(testData);

        /** Expectation */
        expect(response).toBeTrue();
    });

    it('tests "validate" returns "false" when the email is invalid #1', () => {
        /** Data */
        testData.email = 'validEmail@test.com';

        /** Call to Test */
        let response: boolean = loginValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when the email is invalid #2', () => {
        /** Data */
        testData.email = 'valid_mail@test.com';

        /** Call to Test */
        let response: boolean = loginValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });

    it('tests "validate" returns "false" when the password is invalid #1', () => {
        /** Data */
        testData.password = '()Val!dP$w0rd';

        /** Call to Test */
        let response: boolean = loginValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when the password is invalid #2', () => {
        /** Data */
        testData.password = '{}Val!dP$w0rd';

        /** Call to Test */
        let response: boolean = loginValidator.validate(testData);

        /** Expectation */
        expect(response).toBeFalse();
    });
});
