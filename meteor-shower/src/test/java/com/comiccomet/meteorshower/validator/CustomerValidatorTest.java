package com.comiccomet.meteorshower.validator;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.comiccomet.meteorshower.constant.ErrorCodeConstants;
import com.comiccomet.meteorshower.dto.Address;

@SpringBootTest
public class CustomerValidatorTest {
    @Autowired
    private CustomerValidator customerValidator;

    private Address address;
    private String addressString;
    private String city;
    private String country;
    private String postalCode;

    @BeforeEach
    void setUp() {
        this.addressString = "10 Superhero Way";
        this.city = "Sky City";
        this.postalCode = "m2z 9p9";
        this.country = "Canada";
    }

    @Test
    void testValidateAddressSuccess() {
        /** Data */
        int[] expectedResult = {};
        this.address = new Address(this.addressString, this.city, this.postalCode, this.country);

        /** Call to Test*/
        int[] errorCodes = this.customerValidator.validateAddress(this.address);

        /** Assertion */
        assertEquals(expectedResult.length, errorCodes.length);
    }

    @Test
    void testValidateAddressSuccessWhenPostalCodeIsUppercase() {
        /** Data */
        this.postalCode = "M2Z 9P9";
        int[] expectedResult = {};
        this.address = new Address(this.addressString, this.city, this.postalCode, this.country);

        /** Call to Test*/
        int[] errorCodes = this.customerValidator.validateAddress(this.address);

        /** Assertion */
        assertEquals(expectedResult.length, errorCodes.length);
    }

    @ParameterizedTest
    @ValueSource(strings = {"!0 Superhero Way", "%@$#6645", "DROP TABLE customer;"})
    void testValidateAddressFailureWhenWrongAddressStringFormat(String wrongAddressStringFromat) {
        /** Data */
        this.addressString = wrongAddressStringFromat;
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_ADDRESS_FORMAT};
        this.address = new Address(this.addressString, this.city, this.postalCode, this.country);

        /** Call to Test*/
        int[] errorCodes = this.customerValidator.validateAddress(this.address);

        /** Assertion */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Sk5 City", "Sky Cit%", "SELECT * FROM customer;"})
    void testValidateAddressFailureWhenWrongCityFormat(String wrongCityFromat) {
        /** Data */
        this.city = wrongCityFromat;
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_CITY_FORMAT};
        this.address = new Address(this.addressString, this.city, this.postalCode, this.country);

        /** Call to Test*/
        int[] errorCodes = this.customerValidator.validateAddress(this.address);

        /** Assertion */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"M2Z 9P99", "9P9", "ALTER TABLE customer ADD virus BLOB;"})
    void testValidateAddressFailureWhenWrongPostalCodeFormat(String wrongPostalCodeFromat) {
        /** Data */
        this.postalCode = wrongPostalCodeFromat;
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_POSTAL_CODE_FORMAT};
        this.address = new Address(this.addressString, this.city, this.postalCode, this.country);

        /** Call to Test*/
        int[] errorCodes = this.customerValidator.validateAddress(this.address);

        /** Assertion */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Guinea_Burneau", "Cote d\"Ivoire", "ALTER TABLE customer DROP customer_id;"})
    void testValidateAddressFailureWhenWrongCountryFormat(String wrongCountryFromat) {
        /** Data */
        this.country = wrongCountryFromat;
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_COUNTRY_FORMAT};
        this.address = new Address(this.addressString, this.city, this.postalCode, this.country);

        /** Call to Test*/
        int[] errorCodes = this.customerValidator.validateAddress(this.address);

        /** Assertion */
        assertEquals(expectedResult[0], errorCodes[0]);
    }
}
