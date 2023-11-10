package com.comiccomet.sagecave.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.comiccomet.sagecave.service.AdminService;
import com.comiccomet.sagecave.util.TokenManager;

@RestController
public class AdminController {
    @Autowired
    private final AdminService adminService;
    private TokenManager tokenManager;

    public AdminController(AdminService adminService, TokenManager tokenManager) {
        this.adminService = adminService;
        this.tokenManager = tokenManager;
    }

    @GetMapping("/comic-books")
    public ResponseEntity<?> getAllComicBooks(@RequestHeader(value="Authorization") String token) {
        if (!(this.tokenManager.validateToken(token))) {
            return this.adminService.sendIsUnauthorized();
        }

        return this.adminService.getComicBookCatalogue();
    }

    @GetMapping("/comic-books/{comicBookId}")
    public ResponseEntity<?> getComicBook(@RequestHeader(value="Authorization") String token, @PathVariable String comicBookId) {
        if (!(this.tokenManager.validateToken(token))) {
            return this.adminService.sendIsUnauthorized();
        }

        return this.adminService.getSingleComicBook(comicBookId);
    }
}
