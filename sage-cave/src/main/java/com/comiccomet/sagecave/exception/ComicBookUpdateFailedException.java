package com.comiccomet.sagecave.exception;

import com.comiccomet.sagecave.entity.ComicBook;

public class ComicBookUpdateFailedException extends RuntimeException {
    public ComicBookUpdateFailedException(ComicBook unsavedComicBook) {
        super("Unable to update comic book " + unsavedComicBook);
    }
}
