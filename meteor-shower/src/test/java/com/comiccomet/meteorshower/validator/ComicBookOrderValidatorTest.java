package com.comiccomet.meteorshower.validator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.sql.Timestamp;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.comiccomet.meteorshower.constant.ErrorCodeConstants;
import com.comiccomet.meteorshower.constant.GeneralConstants;
import com.comiccomet.meteorshower.dto.OrderReturn;
import com.comiccomet.meteorshower.entity.ComicBook;
import com.comiccomet.meteorshower.entity.ComicBookOrder;
import com.comiccomet.meteorshower.repository.ComicBookRepository;

@SpringBootTest
public class ComicBookOrderValidatorTest {
    @MockBean
    private ComicBookRepository comicBookRepository;
    
    @Autowired
    private ComicBookOrderValidator comicBookOrderValidator;

    private ComicBookOrder[] comicBookOrder = new ComicBookOrder[2];

    @BeforeEach
    void setUp() {
        this.comicBookOrder[0] = new ComicBookOrder(
            "2324fb66-7675-4d68-b713-897411c33767",
            "993c7a8f-0ec5-47ea-9527-514dbfc56640",
            "c1fdfd48-7dc1-4cb0-ab1c-080a2433a1e1",
            Timestamp.valueOf("2023-12-20 00:00:00.000"),
            "none"
        );
        this.comicBookOrder[1] = new ComicBookOrder(
            "2324fb66-7675-4d68-b713-897411c33767",
            "993c7a8f-0ec5-47ea-9527-514dbfc56640",
            "047d70fa-c74c-4cac-b635-bf36812d6ee9",
            Timestamp.valueOf("2023-12-20 00:00:00.200"),
            "none"
        );
    }

    @Test
    void testValidateSuccess() {
        /** Data */
        int[] expectedResult = {};
        ComicBook comicBook = new ComicBook(
            "Example Book Name",
            "Example Book Author",
            29.99f,
            7,
            null,
            "carrying"
        );
        comicBook.setComicBookId("047d70fa-c74c-4cac-b635-bf36812d6ee9");

        /** Mock */
        when(this.comicBookRepository.findByComicBookIdAndCarryStatus(anyString(), eq(GeneralConstants.CARRY_STATUS_CARRYING)))
            .thenReturn(Optional.of(comicBook));

        /** Call to Test */
        int[] errorCodes = this.comicBookOrderValidator.validate(this.comicBookOrder);

        /** Assertion */
        assertEquals(expectedResult.length, errorCodes.length);
    }

    @ParameterizedTest
    @ValueSource(strings = {"a46363a1-7767-4112-8212-ddd647df97f", "aaaaaaa-aaaa-ddddddddddd", "DROP TABLE comic_book;"})
    void testValidateFailureWhenWrongOrderIdFormat(String wrongOrderIdFormat) {
        /** Data */
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_ORDER_ID_FORMAT, ErrorCodeConstants.ERROR_WRONG_ORDER_ID_FORMAT};

        this.comicBookOrder[0].setOrderId(wrongOrderIdFormat);
        this.comicBookOrder[1].setOrderId(wrongOrderIdFormat);

        /** Call to Test */
        int[] errorCodes = this.comicBookOrderValidator.validate(this.comicBookOrder);

        /** Assertion */
        for(int iterator = 0; iterator > expectedResult.length - 1; iterator++) {
            assertEquals(expectedResult[iterator], errorCodes[iterator]);
        }
    }

    @ParameterizedTest
    @ValueSource(strings = {"a46363a1-7767-4112-8212-ddd647df97f", "aaaaaaa-aaaa-ddddddddddd", "DROP TABLE comic_book;"})
    void testValidateFailureWhenWrongCustomerIdFormat(String wrongCustomerIdFormat) {
        /** Data */
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_CUSTOMER_ID_FORMAT, ErrorCodeConstants.ERROR_WRONG_CUSTOMER_ID_FORMAT};

        this.comicBookOrder[0].setCustomerId(wrongCustomerIdFormat);
        this.comicBookOrder[1].setCustomerId(wrongCustomerIdFormat);

        /** Call to Test */
        int[] errorCodes = this.comicBookOrderValidator.validate(this.comicBookOrder);

        /** Assertion */
        for(int iterator = 0; iterator > expectedResult.length - 1; iterator++) {
            assertEquals(expectedResult[iterator], errorCodes[iterator]);
        }
    }

    @ParameterizedTest
    @ValueSource(strings = {"a46363a1-7767-4112-8212-ddd647df97f", "aaaaaaa-aaaa-ddddddddddd", "DROP TABLE comic_book_order;"})
    void testValidateFailureWhenWrongComicBookIdFormat(String wrongComicBookIdFormat) {
        /** Data */
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_COMIC_BOOK_ID_FORMAT, ErrorCodeConstants.ERROR_WRONG_COMIC_BOOK_ID_FORMAT};

        this.comicBookOrder[0].setComicBookId(wrongComicBookIdFormat);
        this.comicBookOrder[1].setComicBookId(wrongComicBookIdFormat);

        /** Call to Test */
        int[] errorCodes = this.comicBookOrderValidator.validate(this.comicBookOrder);

        /** Assertion */
        for(int iterator = 0; iterator > expectedResult.length - 1; iterator++) {
            assertEquals(expectedResult[iterator], errorCodes[iterator]);
        }
    }

    @ParameterizedTest
    @ValueSource(strings = {"3023-12-20 00:00:00", "1923-12-20 00:00:00.000", "0023-12-31 00:00:00.101"})
    void testValidateFailureWhenWrongOrderDateFormat(String wrongOrderDateFormat) {
        /** Data */
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_ORDER_DATE_FORMAT, ErrorCodeConstants.ERROR_WRONG_ORDER_DATE_FORMAT};

        this.comicBookOrder[0].setOrderDate(Timestamp.valueOf(wrongOrderDateFormat));
        this.comicBookOrder[1].setOrderDate(Timestamp.valueOf(wrongOrderDateFormat));

        /** Call to Test */
        int[] errorCodes = this.comicBookOrderValidator.validate(this.comicBookOrder);

        /** Assertion */
        for(int iterator = 0; iterator > expectedResult.length - 1; iterator++) {
            assertEquals(expectedResult[iterator], errorCodes[iterator]);
        }
    }

    @ParameterizedTest
    @ValueSource(strings = {"return", "none|return", "DROP DATABASE db;"})
    void testValidateFailureWhenWrongReturnStatusFormat(String wrongReturnStatusFormat) {
        /** Data */
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_RETURN_STATUS_FORMAT, ErrorCodeConstants.ERROR_WRONG_RETURN_STATUS_FORMAT};

        this.comicBookOrder[0].setReturnStatus(wrongReturnStatusFormat);
        this.comicBookOrder[1].setReturnStatus(wrongReturnStatusFormat);

        /** Call to Test */
        int[] errorCodes = this.comicBookOrderValidator.validate(this.comicBookOrder);

        /** Assertion */
        for(int iterator = 0; iterator > expectedResult.length - 1; iterator++) {
            assertEquals(expectedResult[iterator], errorCodes[iterator]);
        }
    }

    @Test
    void testValidateOrderReturnSuccess() {
        /** Data */
        int[] expectedResult = {};
        OrderReturn validOrderReturn = new OrderReturn(this.comicBookOrder[0].getComicBookId(), "return");

        /** Call to Test */
        int[] errorCodes = this.comicBookOrderValidator.validateOrderReturn(validOrderReturn);

        /** Assertion */
        assertEquals(expectedResult.length, errorCodes.length);
    }

    @ParameterizedTest
    @ValueSource(strings = {"a46363a1-7767-4112-8212-ddd647df97f", "aaaaaaa-aaaa-ddddddddddd", "DROP TABLE comic_book_order;"})
    void testValidateOrderReturnFailureWhenWrongComicBookIdFormat(String wrongComicBookIdFormat) {
        /** Data */
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_COMIC_BOOK_ID_FORMAT};
        OrderReturn invalidOrderReturn = new OrderReturn(wrongComicBookIdFormat, "return");

        /** Call to Test */
        int[] errorCodes = this.comicBookOrderValidator.validateOrderReturn(invalidOrderReturn);

        /** Assertion */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"none", "none|return", "DROP DATABASE db;"})
    void testValidateOrderReturnFailureWhenWrongReturnStatusFormat(String wrongReturnStatusFormat) {
        /** Data */
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_RETURN_STATUS_FORMAT};
        OrderReturn invalidOrderReturn = new OrderReturn(this.comicBookOrder[0].getComicBookId(), wrongReturnStatusFormat);

        /** Call to Test */
        int[] errorCodes = this.comicBookOrderValidator.validateOrderReturn(invalidOrderReturn);

        /** Assertion */
        assertEquals(expectedResult[0], errorCodes[0]);
    }
}
