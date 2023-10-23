package com.comiccomet.fourthwall.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.comiccomet.fourthwall.dto.LoginCredentials;
import com.comiccomet.fourthwall.dto.LoginResponse;
import com.comiccomet.fourthwall.dto.LogoutResponse;
import com.comiccomet.fourthwall.service.AuthenticationService;

@RestController
public class AuthenticationController {
    @Autowired
    private final AuthenticationService authenticationService;
    
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/admin/login")
    public ResponseEntity<LoginResponse> postLogin(@RequestBody LoginCredentials credentials) {
        return this.authenticationService.startSession(credentials);
    }

    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> postLogout(@RequestHeader(value="Authorization") String token) {
        return this.authenticationService.endSession(token);
    }
}
