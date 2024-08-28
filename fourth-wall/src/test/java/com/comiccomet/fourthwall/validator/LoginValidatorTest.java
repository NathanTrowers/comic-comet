package com.comiccomet.fourthwall.validator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.comiccomet.fourthwall.constant.ErrorCodeConstants;
import com.comiccomet.fourthwall.constant.GeneralConstants;
import com.comiccomet.fourthwall.dto.LoginCredentials;
import com.comiccomet.fourthwall.entity.Admin;
import com.comiccomet.fourthwall.entity.Customer;
import com.comiccomet.fourthwall.repository.AdminRepository;
import com.comiccomet.fourthwall.repository.CustomerRepository;

@SpringBootTest
public class LoginValidatorTest {
    @Autowired
    private LoginValidator loginValidator;

    @MockBean
    private AdminRepository adminRepository;

    @MockBean
    private CustomerRepository customerRepository;
    
    @ParameterizedTest
    @ValueSource(strings = {"example@test.com", "exampl3@test.co", "example.dot@test.me"})
    void testValidateSuccessWhenAdminUser(String validEmail) {
        /** Data */
        LoginCredentials credentials = new LoginCredentials(validEmail, "SuperS!@sh3%");
        Admin admin = new Admin(credentials.getEmail(), "Example Name", "$2y$10$Z1N6ljW2G7//Dzi4eGHBTeLCRu2SJozQzufQQJUk4lHXFvE.nLKg.");
        int[] expectedResult = {};

        /** Mocks */
        when(this.adminRepository.findByEmail(credentials.getEmail()))
            .thenReturn(admin);

        /** Call to Test */
        int[] errorCodes = loginValidator.validate(credentials);

        /** Assertions */
        assertEquals(expectedResult.length, errorCodes.length);
    }

    @ParameterizedTest
    @ValueSource(strings = {"example@test.com", "exampl3@test.co", "example.dot@test.me"})
    void testValidateSuccessWhenCustomerUser(String validEmail) {
        /** Data */
        LoginCredentials credentials = new LoginCredentials(validEmail, "SuperS!@sh3%");
        Customer customer = new Customer(credentials.getEmail(), "Example Name", "$2y$10$Z1N6ljW2G7//Dzi4eGHBTeLCRu2SJozQzufQQJUk4lHXFvE.nLKg.");
        int[] expectedResult = {};

        /** Mocks */
        when(this.customerRepository.findByEmail(credentials.getEmail()))
            .thenReturn(customer);

        /** Call to Test */
        int[] errorCodes = loginValidator.validate(credentials, GeneralConstants.CUSTOMER);

        /** Assertions */
        assertEquals(expectedResult.length, errorCodes.length);
    }

    @Test
    void testValidateFailWhenAdminUserEmailNotFound() {
        /** Data */
        LoginCredentials credentials = new LoginCredentials("wrong.email@test.com", "SuperS!@sh3%");
       int[] expectedResult = {ErrorCodeConstants.ERROR_INVALID_EMAIL};

        /** Mocks */
        when(this.adminRepository.findByEmail(credentials.getEmail()))
            .thenReturn(null);

        /** Call to Test */
        int[] errorCodes = loginValidator.validate(credentials);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @Test
    void testValidateFailWhenCustomerUserEmailNotFound() {
        /** Data */
        LoginCredentials credentials = new LoginCredentials("wrong.email@test.com", "SuperS!@sh3%");
       int[] expectedResult = {ErrorCodeConstants.ERROR_INVALID_EMAIL};

        /** Mocks */
        when(this.customerRepository.findByEmail(credentials.getEmail()))
            .thenReturn(null);

        /** Call to Test */
        int[] errorCodes = loginValidator.validate(credentials, GeneralConstants.CUSTOMER);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @Test
    void testValidateFailWhenAdminUserPasswordDoesNotMatch() {
        /** Data */
        LoginCredentials credentials = new LoginCredentials("example@test.com", "SuperS!@sher");
        Admin admin = new Admin("example@test.com", "Example Name", "$2y$10$Z1N6ljW2G7//Dzi4eGHBTeLCRu2SJozQzufQQJUk4lHXFvE.nLKg.");
        int[] expectedResult = {ErrorCodeConstants.ERROR_INVALID_PASSWORD};

        /** Mocks */
        when(this.adminRepository.findByEmail(credentials.getEmail()))
            .thenReturn(admin);

        /** Call to Test */
        int[] errorCodes = loginValidator.validate(credentials);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @Test
    void testValidateFailWhenCustomerUserPasswordDoesNotMatch() {
        /** Data */
        LoginCredentials credentials = new LoginCredentials("example@test.com", "SuperS!@sher");
        Customer customer = new Customer("example@test.com", "Example Name", "$2y$10$Z1N6ljW2G7//Dzi4eGHBTeLCRu2SJozQzufQQJUk4lHXFvE.nLKg.");
        int[] expectedResult = {ErrorCodeConstants.ERROR_INVALID_PASSWORD};

        /** Mocks */
        when(this.customerRepository.findByEmail(credentials.getEmail()))
            .thenReturn(customer);

        /** Call to Test */
        int[] errorCodes = loginValidator.validate(credentials, GeneralConstants.CUSTOMER);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"example!@test.com", "example%@tes%.com", "example!@test.c"})
    void testValidateFailWhenEmailFormatIsWrong(String wrongEmailFormat) {
        /** Data */
        LoginCredentials credentials = new LoginCredentials(wrongEmailFormat, "SuperS!@sher");
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_EMAIL_FORMAT};

        /** Call to Test */
        int[] errorCodes = loginValidator.validate(credentials);

        
        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"SuperS!@sh+%", "SuperS!@sh3(_)", "Super{injectAtk}"})
    void testValidateFailWhenPasswordFormatIsWrong(String wrongPaswordFormat) {
        /** Data */
        LoginCredentials credentials = new LoginCredentials("example@test.com", wrongPaswordFormat);
        Admin admin = new Admin("example@test.com", "Example Name", "$2y$10$Z1N6ljW2G7//Dzi4eGHBTeLCRu2SJozQzufQQJUk4lHXFvE.nLKg.");
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_PASSWORD_FORMAT};

        /** Mocks */
        when(this.adminRepository.findByEmail(credentials.getEmail()))
            .thenReturn(admin);

        /** Call to Test */
        int[] errorCodes = loginValidator.validate(credentials);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }
}
