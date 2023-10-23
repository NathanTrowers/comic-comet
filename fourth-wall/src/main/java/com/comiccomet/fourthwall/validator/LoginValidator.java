package com.comiccomet.fourthwall.validator;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.comiccomet.fourthwall.constant.ErrorCodeConstants;
import com.comiccomet.fourthwall.dto.LoginCredentials;
import com.comiccomet.fourthwall.entity.Admin;
import com.comiccomet.fourthwall.repository.AdminRepository;

@Component
public class LoginValidator implements ValidatorInterface{
    private final AdminRepository adminRepository;
    
    public LoginValidator(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public int[] validate(Object payload) {
        LoginCredentials credentials = (LoginCredentials) payload;
        ArrayList<Integer> errorCodes = new ArrayList<Integer>();
        Admin admin = null;

        Pattern emailPattern = Pattern.compile("^[a-z0-9.]{3,}?@[a-z0-9]{2,}?\\.[a-z]{2,}?$");
        Pattern passwordPattern = Pattern.compile("^[0-9a-zA-Z-.!%$&*@#?]{8,16}?$");
        Matcher emailMatcher = emailPattern.matcher(credentials.getEmail()); //base64 decode and put result here
        Matcher passwordMatcher = passwordPattern.matcher(credentials.getPassword()); //base64 decode and put result here
        boolean isEmailMatch = emailMatcher.find();
        boolean isPasswordMatch = passwordMatcher.find();

        if (!isEmailMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_EMAIL_FORMAT);
        }
        if (!isPasswordMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_PASSWORD_FORMAT);
        }

        if(isEmailMatch && isPasswordMatch){
            admin = this.adminRepository.findByEmail(credentials.getEmail());//base64 decode and put result here
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    
            if (admin == null ) {
                errorCodes.add(ErrorCodeConstants.ERROR_INVALID_EMAIL);
            } else {
                if (!(bcrypt.matches(credentials.getPassword(), admin.getPassword()))) { //base64 decode and put result here
                    errorCodes.add(ErrorCodeConstants.ERROR_INVALID_PASSWORD);
                }
            }
        }
        
        return errorCodes.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
