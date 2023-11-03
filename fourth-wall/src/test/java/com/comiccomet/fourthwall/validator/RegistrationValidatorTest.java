package com.comiccomet.fourthwall.validator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.comiccomet.fourthwall.constant.ErrorCodeConstants;
import com.comiccomet.fourthwall.dto.RegistrationFields;
import com.comiccomet.fourthwall.entity.Customer;
import com.comiccomet.fourthwall.repository.CustomerRepository;

@SpringBootTest
public class RegistrationValidatorTest {
    @Autowired
    private RegistrationValidator registrationValidator;

    @MockBean
    private CustomerRepository customerRepository;

    @ParameterizedTest
    @CsvSource({
        "example@test.com, 'Example User', @rmAM8n10",
        "exampl3@test.co, 'SecondExample', B0ntr%3&&r",
        "example.dot@test.me, 'Sage's Cave', C@mic.Sup!rM*n"
    })
    void testValidateSuccess(String validEmail, String validName, String validPassword) {
        /** Data */
        RegistrationFields registration = new RegistrationFields(validEmail, validName, validPassword);
        // The hashed password does not match any of the password strings used for this test.
        Customer customer = new Customer(registration.getEmail(), validName, "$2y$10$Z1N6ljW2G7//Dzi4eGHBTeLCRu2SJozQzufQQJUk4lHXFvE.nLKg.");
        int[] expectedResult = {};

        /** Mocks */
        when(this.customerRepository.save(registration))
            .thenReturn(customer);

        /** Call to Test */
        int[] errorCodes = registrationValidator.validate(registration);

        /** Assertions */
        assertEquals(expectedResult.length, errorCodes.length);
    }

    @ParameterizedTest
    @ValueSource(strings = {"example!@test.com", "example%@tes%.com", "example!@test.c"})
    void testValidateFailureWhenEmailFormatIsWrong(String wrongEmailFormat) {
        /** Data */
        String validName = "Example User";
        String validPassword = "@rmAM8n10";
        RegistrationFields registration = new RegistrationFields(wrongEmailFormat, validName, validPassword);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_EMAIL_FORMAT};

        /** Call to Test */
        int[] errorCodes = registrationValidator.validate(registration);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "DROP TABLE admin;", "{mongodb:injectionAttack}"})
    void testValidateFailureWhenNameFormatIsWrong(String wrongNameFormat) {
        /** Data */
        String validEmail = "example@test.com";
        String validPassword = "@rmAM8n10";
        RegistrationFields registration = new RegistrationFields(validEmail, wrongNameFormat, validPassword);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_NAME_FORMAT};

        /** Call to Test */
        int[] errorCodes = registrationValidator.validate(registration);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"SuperS!@sh+%", "SuperS!@sh3(_)", "Super{injectAtk}"})
    void testValidateFailureWhenPasswordFormatIsWrong(String wrongPasswordFormat) {
        /** Data */
        String validEmail = "example@test.com";
        String validName = "Example User";
        RegistrationFields registration = new RegistrationFields(validEmail, validName, wrongPasswordFormat);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_PASSWORD_FORMAT};

        /** Call to Test */
        int[] errorCodes = registrationValidator.validate(registration);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @Test
    void testValidateFailureWhenAllInputIsFormattedWrong() {
        /** Data */
        String invalidEmail = "example%@tes%.com";
        String invalidName = "{mongodb:injectionAttack}";
        String invalidPassword = "SuperS!@sh+%";
        RegistrationFields registration = new RegistrationFields(invalidEmail, invalidName, invalidPassword);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_EMAIL_FORMAT, ErrorCodeConstants.ERROR_WRONG_NAME_FORMAT, ErrorCodeConstants.ERROR_WRONG_PASSWORD_FORMAT};

        /** Call to Test */
        int[] errorCodes = registrationValidator.validate(registration);

        /** Assertions */
        for(int iterator = 0; iterator < errorCodes.length; iterator++) {
            assertEquals(expectedResult[iterator], errorCodes[iterator]);
        }
    }

    @Test
    void testValidateFailureWhenCustomerIsNull() {
        /** Data */
        String validEmail = "example@test.com";
        String validName = "Example User";
        String validPassword = "@rmAM8n10";
        RegistrationFields registration = new RegistrationFields(validEmail, validName, validPassword);
        int[] expectedResult = {ErrorCodeConstants.ERROR_SAVE_REGISTRATION_FAILED};

        /** Mocks */
        when(this.customerRepository.findByEmail(registration.getEmail()))
            .thenReturn(null);
        when(this.customerRepository.save(registration))
            .thenReturn(null);
        
            /** Call to Test */
        int[] errorCodes = registrationValidator.validate(registration);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @Test
    void testValidateFailureWhenCustomerExists() {
        /** Data */
        String validEmail = "example@test.com";
        String validName = "Example User";
        String validPassword = "@rmAM8n10";
        RegistrationFields registration = new RegistrationFields(validEmail, validName, validPassword);
        // The hashed password does not match any of the password strings used for this test.
        Customer customer = new Customer(validEmail, validName, "$2y$10$Z1N6ljW2G7//Dzi4eGHBTeLCRu2SJozQzufQQJUk4lHXFvE.nLKg.");
        int[] expectedResult = {ErrorCodeConstants.ERROR_CUSTOMER_ALREADY_EXISTS};

        /** Mock */
        when(this.customerRepository.findByEmail(registration.getEmail()))
            .thenReturn(customer);
        
        /** Call to Test */
        int[] errorCodes = registrationValidator.validate(registration);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }
}
