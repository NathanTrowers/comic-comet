package com.comiccomet.meteorshower.exception;

public class ComicBookNotFoundException extends RuntimeException {
    public ComicBookNotFoundException(String comicBookId) {
        super("Unable to find comic book " + comicBookId);
    }
}
