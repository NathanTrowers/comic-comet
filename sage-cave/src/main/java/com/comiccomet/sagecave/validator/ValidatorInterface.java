package com.comiccomet.sagecave.validator;

public interface ValidatorInterface {
    int[] validate(Object payload);

    int validateId(String id);
}
