package com.comiccomet.meteorshower.exception;

import com.comiccomet.meteorshower.dto.Address;

public class AddressUnchangedException extends RuntimeException {
    public AddressUnchangedException(Address unsavedAddress) {
        super("The address given has nothing to update in it:  " + unsavedAddress);
    }
}
