package com.comiccomet.sagecave.validator;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.comiccomet.sagecave.constant.ErrorCodeConstants;
import com.comiccomet.sagecave.entity.ComicBook;

@SpringBootTest
public class ComicBookValidatorTest {
    @Autowired
    private ComicBookValidator comicBookValidator;

    private ComicBook comicBook;
    
    @BeforeEach
    void setUp() {
        this.comicBook = new ComicBook(
            "Example Book Name",
            "Example Book Author",
            29.99f,
            7,
            null,
            "carrying"
        );
    }

    @Test
    void testValidateSuccess() {
        /** Data */
        int[] expectedResult = {};

        /** Call to Test */
        int[] errorCodes = this.comicBookValidator.validate(this.comicBook);

        /** Assertions */
        assertEquals(expectedResult.length, errorCodes.length);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Ex@mple Name", "Examp!e Name", "{injectionAttack: malice}"})
    void testValidateFailureWhenWrongNameFormat(String wrongNameFormat) {
        /** Data */
        this.comicBook.setName(wrongNameFormat);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_NAME_FORMAT};

        /** Call to Test */
        int[] errorCodes = this.comicBookValidator.validate(this.comicBook);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Ex@mple Auth#r", "Examp!e $uthor", "(DROP TABLE comic_book)"})
    void testValidateFailureWhenWrongAuthorFormat(String wrongAuthorFormat) {
        /** Data */
        this.comicBook.setAuthor(wrongAuthorFormat);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_AUTHOR_FORMAT};

        /** Call to Test */
        int[] errorCodes = this.comicBookValidator.validate(this.comicBook);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(floats =  {9999.00f, 0, 999.777f})
    void testValidateFailureWhenWrongPriceFormat(float wrongPriceFormat) {
        /** Data */
        this.comicBook.setPrice(wrongPriceFormat);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_PRICE_FORMAT};

        /** Call to Test */
        int[] errorCodes = this.comicBookValidator.validate(this.comicBook);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(ints =  {-1, 9999})
    void testValidateFailureWhenWrongQuantityFormat(int wrongQuantityFormat) {
        /** Data */
        this.comicBook.setQuantity(wrongQuantityFormat);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_QUANTITY_FORMAT};

        /** Call to Test */
        int[] errorCodes = this.comicBookValidator.validate(this.comicBook);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"E", "carrying|discontinued", "carrying{injection}"})
    void testValidateFailureWhenWrongCarryStatusFormat(String wrongCarryStatusFormat) {
        /** Data */
        this.comicBook.setCarryStatus(wrongCarryStatusFormat);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_CARRY_STATUS_FORMAT};

        /** Call to Test */
        int[] errorCodes = this.comicBookValidator.validate(this.comicBook);

        /** Assertions */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    // NOTE: Need to find a way to trigger failing file validation in test
}
