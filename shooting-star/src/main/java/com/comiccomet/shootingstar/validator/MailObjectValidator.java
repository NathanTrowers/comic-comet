package com.comiccomet.shootingstar.validator;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import com.comiccomet.shootingstar.constant.ErrorCodeConstants;
import com.comiccomet.shootingstar.dto.MailObject;

@Component
public class MailObjectValidator implements ValidatorInterface {
    public int[] validate(Object payload) {
        ArrayList<Integer> errorCodes = new ArrayList<Integer>();
        MailObject mailObject = (MailObject) payload;
        Pattern subjectPattern = Pattern.compile("^[/0-9A-Za-z'\\-. #]{2,}?$");
        Pattern textPattern = Pattern.compile("^[/0-9A-Za-z'\\-. #_!?/()@$%+*\r]{2,}?$");
        Matcher subjectMatcher = subjectPattern.matcher(mailObject.getSubject());
        Matcher textMatcher = textPattern.matcher(mailObject.getText());
        boolean isSubjectMatch = subjectMatcher.find();
        boolean isTextMatch = textMatcher.find();

        if (!isSubjectMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_SUBJECT_FORMAT);
        }
        if (!isTextMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_TEXT_FORMAT);
        }
        
        return errorCodes.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
