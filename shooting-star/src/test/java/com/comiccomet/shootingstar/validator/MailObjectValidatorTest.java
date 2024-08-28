package com.comiccomet.shootingstar.validator;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.comiccomet.shootingstar.constant.ErrorCodeConstants;
import com.comiccomet.shootingstar.dto.MailObject;
import com.comiccomet.shootingstar.validator.MailObjectValidator;

@SpringBootTest(classes = MailObjectValidator.class)
public class MailObjectValidatorTest {
    @Autowired
    private MailObjectValidator mailObjectValidator;

    private  MailObject mailObject;

    @BeforeEach
    void setUp() {
        this.mailObject = new MailObject("Example Subject","Example Text \r Block 1!");
    }

    @Test
    void testValidateSuccess() {
        /** Data */
        int[] expectedResult = {};

        /** Call to Test */
        int[] errorCodes = this.mailObjectValidator.validate(this.mailObject);
     
        /** Assertion */
        assertEquals(expectedResult.length, errorCodes.length);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Ex@mple Subject", "Example Subjec^", "Example $ubject"})
    void testValidateFailureWhenWrongSubjectFormat(String wrongSubjectFormat) {
        /** Data */
        this.mailObject.setSubject(wrongSubjectFormat);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_SUBJECT_FORMAT};

        /** Call to Test */
        int[] errorCodes = this.mailObjectValidator.validate(this.mailObject);
     
        /** Assertion */
        assertEquals(expectedResult[0], errorCodes[0]);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Ex^mple Text", "Example Tex~", "Example T{`}xt"})
    void testValidateFailureWhenWrongTextFormat(String wrongTextFormat) {
        /** Data */
        this.mailObject.setText(wrongTextFormat);
        int[] expectedResult = {ErrorCodeConstants.ERROR_WRONG_TEXT_FORMAT};

        /** Call to Test */
        int[] errorCodes = this.mailObjectValidator.validate(this.mailObject);
     
        /** Assertion */
        assertEquals(expectedResult[0], errorCodes[0]);
    }
}
