package com.comiccomet.fourthwall.validator;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.comiccomet.fourthwall.constant.ErrorCodeConstants;
import com.comiccomet.fourthwall.dto.RegistrationFields;
import com.comiccomet.fourthwall.entity.Customer;
import com.comiccomet.fourthwall.repository.CustomerRepository;

@Component
public class RegistrationValidator implements ValidatorInterface {
    private final CustomerRepository customerRepository;

    public RegistrationValidator(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public int[] validate(Object payload) {
        return this.validate(payload, null);
    }

    public int[] validate(Object payload, String nullField) {
        RegistrationFields registration = (RegistrationFields) payload;
        ArrayList<Integer> errorCodes = new ArrayList<Integer>();

        Pattern emailPattern = Pattern.compile("^[a-z0-9.]{3,}?@[a-z0-9]{2,}?\\.[a-z]{2,}?$");
        Pattern namePattern = Pattern.compile("^[0-9a-zA-Z-' ]{1,50}?$");
        Pattern passwordPattern = Pattern.compile("^[0-9a-zA-Z-.!%$&*@#?]{8,16}?$");
        Matcher emailMatcher = emailPattern.matcher(registration.getEmail());
        Matcher nameMatcher = namePattern.matcher(registration.getName());
        Matcher passwordMatcher = passwordPattern.matcher(registration.getPassword());
        boolean isEmailMatch = emailMatcher.find();
        boolean isNameMatch = nameMatcher.find();
        boolean isPasswordMatch = passwordMatcher.find();

        if (!isEmailMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_EMAIL_FORMAT);
        }
        if (!isNameMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_NAME_FORMAT);
        }
        if (!isPasswordMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_PASSWORD_FORMAT);
        }

        if(isEmailMatch 
            && isNameMatch
            && isPasswordMatch
        ){
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            String encodedPassword = bcrypt.encode(registration.getPassword());
            registration.setPassword(encodedPassword);

            Customer existingCustomer = this.customerRepository.findByEmail(registration.getEmail());
            if (existingCustomer != null)  {
                errorCodes.add(ErrorCodeConstants.ERROR_CUSTOMER_ALREADY_EXISTS);
            } else {
                Customer customer = this.customerRepository.save(
                    new Customer(registration.getEmail(), registration.getName(), registration.getPassword())
                );
                if (customer == null ) {
                    errorCodes.add(ErrorCodeConstants.ERROR_SAVE_REGISTRATION_FAILED);
                }
            }
        }

        return errorCodes.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
