package com.comiccomet.meteorshower.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.comiccomet.meteorshower.service.ComicBookService;
import com.comiccomet.meteorshower.util.TokenManager;

@RestController
public class ComicBookController {
    @Autowired
    private final ComicBookService comicBookService;
    private TokenManager tokenManager;

    public ComicBookController(ComicBookService comicBookService, TokenManager tokenManager) {
        this.comicBookService = comicBookService;
        this.tokenManager = tokenManager;
    }

    @GetMapping("/comic-books")
    public ResponseEntity<?> getAllComicBooks(@RequestHeader(value="Authorization") String token) {
        String customerId = this.tokenManager.validateToken(token);
        if (customerId == "") {
            return this.comicBookService.sendIsUnauthorized();
        }

        return this.comicBookService.getComicBookCatalogue(customerId);
    }

    @GetMapping("/comic-books/{comicBookId}")
    public ResponseEntity<?> getComicBook(@RequestHeader(value="Authorization") String token, @PathVariable String comicBookId) {
        String customerId = this.tokenManager.validateToken(token);
        if (customerId == "") {
            return this.comicBookService.sendIsUnauthorized();
        }

        return this.comicBookService.getSingleComicBook(customerId, comicBookId);
    }
}
