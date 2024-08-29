package com.comiccomet.meteorshower.exception;

import com.comiccomet.meteorshower.entity.ComicBook;

public class ComicBookUpdateFailedException extends RuntimeException {
    public ComicBookUpdateFailedException(ComicBook unsavedComicBook) {
        super("Unable to update comic book " + unsavedComicBook);
    }
}
