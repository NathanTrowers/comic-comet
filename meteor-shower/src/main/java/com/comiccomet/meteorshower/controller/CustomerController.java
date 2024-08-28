package com.comiccomet.meteorshower.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.comiccomet.meteorshower.dto.Address;
import com.comiccomet.meteorshower.service.ComicBookService;
import com.comiccomet.meteorshower.service.CustomerService;
import com.comiccomet.meteorshower.util.TokenManager;


@RestController
public class CustomerController {
    @Autowired
    private final ComicBookService comicBookService;
    @Autowired
    private final CustomerService customerService;
    private TokenManager tokenManager;

    public CustomerController(ComicBookService comicBookService, CustomerService customerService, TokenManager tokenManager) {
        this.comicBookService = comicBookService;
        this.customerService = customerService;
        this.tokenManager = tokenManager;
    }

    @GetMapping("/customer/address")
    public ResponseEntity<?> getAddress(@RequestHeader(value="Authorization") String token) {
        String customerId = this.tokenManager.validateToken(token);
        if (customerId == "") {
            return this.comicBookService.sendIsUnauthorized();
        }

        return this.customerService.getSingleAddress(customerId);
    }

    @PatchMapping("/customer/address")
    public ResponseEntity<?> patchAddress(@RequestHeader(value="Authorization") String token, @RequestBody Address address) {
        String customerId = this.tokenManager.validateToken(token);
        if (customerId == "") {
            return this.comicBookService.sendIsUnauthorized();
        }

        return this.customerService.patchSingleAddress(customerId, address);
    }
}
