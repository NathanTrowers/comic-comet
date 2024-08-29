package com.comiccomet.sagecave.exception;

public class ComicBookNotFoundException extends RuntimeException {
    public ComicBookNotFoundException(String comicBookId) {
        super("Unable to find comic book " + comicBookId);
    }
}
