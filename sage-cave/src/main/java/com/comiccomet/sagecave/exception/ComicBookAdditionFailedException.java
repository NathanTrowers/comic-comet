package com.comiccomet.sagecave.exception;

import com.comiccomet.sagecave.entity.ComicBook;

public class ComicBookAdditionFailedException extends RuntimeException {
    public ComicBookAdditionFailedException(ComicBook unsavedComicBook) {
        super("Unable to add comic book " + unsavedComicBook);
    }
}
