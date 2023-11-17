package com.comiccomet.fourthwall.service;

import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.comiccomet.fourthwall.constant.GeneralConstants;
import com.comiccomet.fourthwall.dto.LoginCredentials;
import com.comiccomet.fourthwall.dto.LoginResponse;
import com.comiccomet.fourthwall.dto.LogoutResponse;
import com.comiccomet.fourthwall.dto.RegistrationFields;
import com.comiccomet.fourthwall.dto.RegistrationResponse;
import com.comiccomet.fourthwall.entity.Admin;
import com.comiccomet.fourthwall.entity.Customer;
import com.comiccomet.fourthwall.entity.User;
import com.comiccomet.fourthwall.repository.AdminRepository;
import com.comiccomet.fourthwall.repository.CustomerRepository;
import com.comiccomet.fourthwall.util.TokenManager;
import com.comiccomet.fourthwall.validator.ValidatorInterface;

@Service
public class AuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);
    private final AdminRepository adminRepository;
    private final CustomerRepository customerRepository;

    private TokenManager tokenManager;
    private ValidatorInterface loginValidator;
    private ValidatorInterface registrationValidator;

    public AuthenticationService(TokenManager tokenManager, ValidatorInterface loginValidator, ValidatorInterface registrationValidator,
        AdminRepository adminRepository, CustomerRepository customerRepository
    ) {
        this.adminRepository = adminRepository;
        this.customerRepository = customerRepository;
        this.tokenManager = tokenManager;
        this.loginValidator = loginValidator;
        this.registrationValidator = registrationValidator;
    }

    public ResponseEntity<RegistrationResponse> register(RegistrationFields registration) {
        try {
            String decodedName = this.decodeString(registration.getName());
            String decodedEmail = this.decodeString(registration.getEmail());
            String decodedPassword = this.decodeString(registration.getPassword());
            registration.setName(decodedName);
            registration.setEmail(decodedEmail);
            registration.setPassword(decodedPassword);
            int[] errorCodes = this.registrationValidator.validate(registration);
            if (errorCodes.length > 0) {
                log.error("Registration failed for email {}", registration.getEmail());

                return ResponseEntity
                    .badRequest()
                    .body(new RegistrationResponse(401, errorCodes));
            }

            log.info("Registration successful for email {}", registration.getEmail());

            return ResponseEntity
                .accepted()
                .body(new RegistrationResponse(202, errorCodes));
        } catch(Exception error) {
            log.error("Registration failed with the following error: \n", error);
            int[] noCodes = {};

            return ResponseEntity
                .badRequest()
                .body(new RegistrationResponse(400, noCodes));
        }
    }

    public ResponseEntity<LoginResponse> startSession(LoginCredentials credentials, String loginType) {
        try {
            User user = null;
            String decodedEmail = this.decodeString(credentials.getEmail());
            String decodedPassword = this.decodeString(credentials.getPassword());
            credentials.setEmail(decodedEmail);
            credentials.setPassword(decodedPassword);

            int[] errorCodes = this.loginValidator.validate(credentials, loginType);
            if (errorCodes.length > 0) {
                log.error("Authentication failed for email {}", credentials.getEmail());

                return ResponseEntity
                    .badRequest()
                    .body(new LoginResponse(401, "Check your credentials and try again.", errorCodes));
            }

            log.info("Authentication successful for email {}", credentials.getEmail());
   
            if (loginType == GeneralConstants.ADMIN) {
                Admin admin = this.adminRepository.findByEmail(credentials.getEmail());

                return ResponseEntity
                    .accepted()
                    .body(new LoginResponse(202, this.tokenManager.generateToken(admin.getAdminId(), loginType), errorCodes));
            } else {
                Customer customer =  this.customerRepository.findByEmail(credentials.getEmail());
                
                return ResponseEntity
                    .accepted()
                    .body(new LoginResponse(202, this.tokenManager.generateToken(customer.getCustomerId(), loginType), errorCodes));
            }

 
        } catch (Exception error) {
            log.error("Login request failed with the following error: \n {}", error);
            int[] noCodes = {};

            return ResponseEntity
                .badRequest()
                .body(new LoginResponse(400, "Bad Request", noCodes));
        }
    }

    public ResponseEntity<LogoutResponse> endSession(String token) {
        try {
            String invalidToken = this.tokenManager.invalidateToken(token);
            log.info("Logout successful!");

            return ResponseEntity
                .accepted()
                .body(new LogoutResponse(202, invalidToken));

        } catch (Exception error) {
            log.error("Logout request failed: \n {}", error);
            
            return ResponseEntity
                .internalServerError()
                .body(new LogoutResponse(500, ""));
        }
    }

    private String decodeString(String encodedString) {
        return new String(
            Base64.getDecoder().decode(encodedString)
        );
    }
}
