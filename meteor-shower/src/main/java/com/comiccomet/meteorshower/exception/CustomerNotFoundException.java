package com.comiccomet.meteorshower.exception;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(String customerId) {
        super("Unable to find customer for ID " + customerId + ".  Someone has most likely forged a JWT that passes authorization checks.");
    }
}
