package com.comiccomet.meteorshower.validator;

import com.comiccomet.meteorshower.dto.OrderReturn;

public interface ComicBookOrderValidatorInterface extends ValidatorInterface {
    public int[] validateOrderReturn(OrderReturn orderReturn);
}
