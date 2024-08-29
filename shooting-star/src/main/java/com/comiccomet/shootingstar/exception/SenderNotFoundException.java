package com.comiccomet.shootingstar.exception;

public class SenderNotFoundException extends RuntimeException {
    public SenderNotFoundException() {
        super("Unable to find sender in the database");
    }
}
