package com.comiccomet.meteorshower.validator;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import com.comiccomet.meteorshower.constant.ErrorCodeConstants;
import com.comiccomet.meteorshower.dto.Address;

@Component
public class CustomerValidator implements CustomerValidatorInterface {
    public int[] validateAddress(Object payload) {
        Address address = (Address) payload;
        ArrayList<Integer> errorCodes = new ArrayList<Integer>();

        Pattern addressPattern = Pattern.compile("^[0-9a-zA-Z-/ ]{1,50}?$");
        Pattern cityPattern = Pattern.compile("^[a-zA-Z ]{1,50}?$");
        Pattern postalCodePattern = Pattern.compile("^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$");
        Pattern countryPattern = Pattern.compile("^[0-9a-zA-Z-' ]{1,50}?$");
        Matcher addressMatcher = addressPattern.matcher(address.address());
        Matcher cityMatcher = cityPattern.matcher(address.city());
        Matcher postalCodeMatcher = postalCodePattern.matcher(address.postalCode().toUpperCase());
        Matcher countryMatcher = countryPattern.matcher(address.country());
        boolean isAddressMatch = addressMatcher.find();
        boolean isCityMatch = cityMatcher.find();
        boolean isPostalCodeMatch = postalCodeMatcher.find();
        boolean isCountryMatch = countryMatcher.find();

        if (!isAddressMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_ADDRESS_FORMAT);
        }
        if (!isCityMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_CITY_FORMAT);
        }
        if (!isPostalCodeMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_POSTAL_CODE_FORMAT);
        }
        if (!isCountryMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_COUNTRY_FORMAT);
        }

        return errorCodes.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
