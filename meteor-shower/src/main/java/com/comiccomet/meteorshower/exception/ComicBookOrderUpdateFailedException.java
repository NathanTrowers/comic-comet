package com.comiccomet.meteorshower.exception;

public class ComicBookOrderUpdateFailedException extends RuntimeException {
    public ComicBookOrderUpdateFailedException(String orderId, String comicBookId) {
        super("Unable to update comic book order with orderId " + orderId  + " and comicBookId " + comicBookId);
    }
}
