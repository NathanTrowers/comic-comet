package com.comiccomet.fourthwall.validator;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.comiccomet.fourthwall.constant.ErrorCodeConstants;
import com.comiccomet.fourthwall.constant.GeneralConstants;
import com.comiccomet.fourthwall.dto.LoginCredentials;
import com.comiccomet.fourthwall.entity.User;
import com.comiccomet.fourthwall.repository.AdminRepository;
import com.comiccomet.fourthwall.repository.CustomerRepository;

@Component
public class LoginValidator implements ValidatorInterface{
    private final AdminRepository adminRepository;
    private final CustomerRepository customerRepository;
    
    public LoginValidator(AdminRepository adminRepository, CustomerRepository customerRepository) {
        this.adminRepository = adminRepository;
        this.customerRepository = customerRepository;
    }

    /**
     * This method assumes that the payload is for an Admin user
     */
    public int[] validate(Object payload) {
        return this.validate(payload, GeneralConstants.ADMIN);
    }

    public int[] validate(Object payload, String loginType) {
        LoginCredentials credentials = (LoginCredentials) payload;
        ArrayList<Integer> errorCodes = new ArrayList<Integer>();
        User user = null;

        Pattern emailPattern = Pattern.compile("^[a-z0-9.]{3,}?@[a-z0-9]{2,}?\\.[a-z]{2,}?$");
        Pattern passwordPattern = Pattern.compile("^[0-9a-zA-Z-.!%$&*@#?]{8,16}?$");
        Matcher emailMatcher = emailPattern.matcher(credentials.getEmail());
        Matcher passwordMatcher = passwordPattern.matcher(credentials.getPassword());
        boolean isEmailMatch = emailMatcher.find();
        boolean isPasswordMatch = passwordMatcher.find();

        if (!isEmailMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_EMAIL_FORMAT);
        }
        if (!isPasswordMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_PASSWORD_FORMAT);
        }

        if(isEmailMatch && isPasswordMatch){
            user = loginType == GeneralConstants.ADMIN
                ? this.adminRepository.findByEmail(credentials.getEmail())
                : this.customerRepository.findByEmail(credentials.getEmail());

            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    
            if (user == null ) {
                errorCodes.add(ErrorCodeConstants.ERROR_INVALID_EMAIL);
            } else {
                if (!(bcrypt.matches(credentials.getPassword(), user.getPassword()))) {
                    errorCodes.add(ErrorCodeConstants.ERROR_INVALID_PASSWORD);
                }
            }
        }
        
        return errorCodes.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
