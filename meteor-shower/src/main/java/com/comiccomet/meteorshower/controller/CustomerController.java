package com.comiccomet.meteorshower.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.comiccomet.meteorshower.service.CustomerService;
import com.comiccomet.meteorshower.util.TokenManager;

@RestController
public class CustomerController {
    @Autowired
    private final CustomerService customerService;
    private TokenManager tokenManager;

    public CustomerController(CustomerService customerService, TokenManager tokenManager) {
        this.customerService = customerService;
        this.tokenManager = tokenManager;
    }

    @GetMapping("/comic-books")
    public ResponseEntity<?> getAllComicBooks(@RequestHeader(value="Authorization") String token) {
        String cusotmerId = this.tokenManager.validateToken(token);
        if (cusotmerId == "") {
            return this.customerService.sendIsUnauthorized();
        }

        return this.customerService.getComicBookCatalogue(cusotmerId);
    }

    @GetMapping("/comic-books/{comicBookId}")
    public ResponseEntity<?> getComicBook(@RequestHeader(value="Authorization") String token, @PathVariable String comicBookId) {
        String cusotmerId = this.tokenManager.validateToken(token);
        if (cusotmerId == "") {
            return this.customerService.sendIsUnauthorized();
        }

        return this.customerService.getSingleComicBook(cusotmerId, comicBookId);
    }
}
