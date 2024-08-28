import { RegistrationValidator } from "src/app/authentication/register/registration.validator";
import RegistrationCredentials from "src/app/authentication/interfaces/request/RegistrationCredentials";

describe('Test Suite for RegistrationValidator', () => {
    let testData: RegistrationCredentials;
    let registrationValidator: RegistrationValidator;
    let passwordConfirmation: string;

    beforeEach(() => {
        testData = {
            email:      'validemail@test.com',
            name:       'Example Name',
            password:   'Val!dP@$%w0rd'
          } 
        
        passwordConfirmation = 'Val!dP@$%w0rd';
        registrationValidator = new RegistrationValidator();
    });

    it('tests "validate" returns "true" when input is valid', () => {
        /** Call to Test */
        let response: boolean = registrationValidator.validate(testData, passwordConfirmation);

        /** Expectation */
        expect(response).toBeTrue();
    });

    it('tests "validate" returns "false" when the email is invalid #1', () => {
        /** Data */
        testData.email = 'validEmail@test.com';

        /** Call to Test */
        let response: boolean = registrationValidator.validate(testData, passwordConfirmation);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when the email is invalid #2', () => {
        /** Data */
        testData.email = 'valid_mail@test.com';

        /** Call to Test */
        let response: boolean = registrationValidator.validate(testData, passwordConfirmation);

        /** Expectation */
        expect(response).toBeFalse();
    });

    it('tests "validate" returns "false" when the name is invalid #1', () => {
        /** Data */
        testData.name = 'Example(N)ame';

        /** Call to Test */
        let response: boolean = registrationValidator.validate(testData, passwordConfirmation);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when the name is invalid #2', () => {
        /** Data */
        testData.name = '{mongodb:injectionAttack}';

        /** Call to Test */
        let response: boolean = registrationValidator.validate(testData, passwordConfirmation);

        /** Expectation */
        expect(response).toBeFalse();
    });

    it('tests "validate" returns "false" when the password is invalid #1', () => {
        /** Data */
        testData.password = '()Val!dP$w0rd';
        passwordConfirmation = '()Val!dP$w0rd';

        /** Call to Test */
        let response: boolean = registrationValidator.validate(testData, passwordConfirmation);

        /** Expectation */
        expect(response).toBeFalse();
    });
    it('tests "validate" returns "false" when the password is invalid #2', () => {
        /** Data */
        testData.password = '{}Val!dP$w0rd';
        passwordConfirmation = '{}Val!dP$w0rd';

        /** Call to Test */
        let response: boolean = registrationValidator.validate(testData, passwordConfirmation);

        /** Expectation */
        expect(response).toBeFalse();
    });

    
    it('tests "validate" returns "false" when the password and password confirmation do not match', () => {
        /** Data */
        passwordConfirmation = 'Val!dP@$%w0rd!!';

        /** Call to Test */
        let response: boolean = registrationValidator.validate(testData, passwordConfirmation);

        /** Expectation */
        expect(response).toBeFalse();
    });
});
