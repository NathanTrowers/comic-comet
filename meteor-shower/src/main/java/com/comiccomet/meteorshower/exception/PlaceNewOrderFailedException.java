package com.comiccomet.meteorshower.exception;

import com.comiccomet.meteorshower.entity.ComicBookOrder;

public class PlaceNewOrderFailedException extends RuntimeException {
    public PlaceNewOrderFailedException(ComicBookOrder[] newOrder) {
        super("Unable to place order " + newOrder);
    }
}
