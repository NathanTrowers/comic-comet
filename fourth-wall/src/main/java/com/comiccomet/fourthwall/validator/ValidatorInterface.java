package com.comiccomet.fourthwall.validator;

public interface ValidatorInterface {
    int[] validate(Object payload);
    int[] validate(Object payload, String extraField);
}
