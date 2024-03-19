package com.comiccomet.shootingstar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.comiccomet.shootingstar.dto.MailObject;
import com.comiccomet.shootingstar.service.EmailService;
import com.comiccomet.shootingstar.util.TokenManager;
import com.comiccomet.shootingstar.validator.ValidatorInterface;

@RestController
public class MailController {
    @Autowired
    private final EmailService emailService;
    @Autowired
    private TokenManager tokenManager;

    public MailController(EmailService emailService, ValidatorInterface mailObjectValidator, TokenManager tokenManager) {
        this.emailService = emailService;
        this.tokenManager = tokenManager;
    }

    @PostMapping("/mail/send")
    public ResponseEntity<?> createHtmlMail(@RequestHeader(value = "Authorization") String token, @RequestBody MailObject mailObject) {
        String customerId = this.tokenManager.validateToken(token);
        if (customerId == "") {
            return this.emailService.sendIsUnauthorized();
        }

        return this.emailService.sendMessage(customerId, mailObject);      
    }
}
