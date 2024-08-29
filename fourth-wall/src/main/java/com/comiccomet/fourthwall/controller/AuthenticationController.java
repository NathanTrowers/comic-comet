package com.comiccomet.fourthwall.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.comiccomet.fourthwall.constant.GeneralConstants;
import com.comiccomet.fourthwall.dto.LoginCredentials;
import com.comiccomet.fourthwall.dto.LoginResponse;
import com.comiccomet.fourthwall.dto.LogoutResponse;
import com.comiccomet.fourthwall.dto.RegistrationFields;
import com.comiccomet.fourthwall.dto.RegistrationResponse;
import com.comiccomet.fourthwall.service.AuthenticationService;

@RestController
public class AuthenticationController {
    @Autowired
    private final AuthenticationService authenticationService;
    
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/admin/login")
    public ResponseEntity<LoginResponse> postAdminLogin(@RequestBody LoginCredentials credentials) {
        return this.authenticationService.startSession(credentials, GeneralConstants.ADMIN);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> postCustomerLogin(@RequestBody LoginCredentials credentials) {
        return this.authenticationService.startSession(credentials, GeneralConstants.CUSTOMER);
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> postCustomerRegistration(@RequestBody RegistrationFields registration) {
        return this.authenticationService.register(registration);
    }

    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> postLogout(@RequestHeader(value="Authorization") String token) {
        return this.authenticationService.endSession(token);
    }
}
