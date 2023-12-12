package com.comiccomet.sagecave.exception;

import com.comiccomet.sagecave.entity.ComicBook;

public class ComicBookHasNoUpdatesException extends RuntimeException {
    public ComicBookHasNoUpdatesException(ComicBook unsavedComicBook) {
        super("The following comic book data has no updates: " + unsavedComicBook);
    }
}
