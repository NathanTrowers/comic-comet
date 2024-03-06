package com.comiccomet.meteorshower.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.comiccomet.meteorshower.dto.OrderReturn;
import com.comiccomet.meteorshower.entity.ComicBookOrder;
import com.comiccomet.meteorshower.service.ComicBookService;
import com.comiccomet.meteorshower.service.OrderService;
import com.comiccomet.meteorshower.util.TokenManager;
@RestController
public class OrderController {
    @Autowired
    private final ComicBookService comicBookService;
    @Autowired
    private final OrderService orderService;
    private TokenManager tokenManager;

    public OrderController(ComicBookService comicBookService, OrderService orderService, TokenManager tokenManager) {
        this.comicBookService = comicBookService;
        this.orderService = orderService;
        this.tokenManager = tokenManager;
    }

    @PostMapping("/order/new")
    public ResponseEntity<?> postNewOrder(@RequestHeader(value="Authorization") String token, @RequestBody ComicBookOrder[] newOrder) {
        String customerId = this.tokenManager.validateToken(token);
        if (customerId == "") {
            return this.comicBookService.sendIsUnauthorized();
        }

        return this.orderService.placeNewOrder(customerId, newOrder);
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(@RequestHeader(value="Authorization") String token) {
        String customerId = this.tokenManager.validateToken(token);
        if (customerId == "") {
            return this.comicBookService.sendIsUnauthorized();
        }

        return this.orderService.getPastOrders(customerId);
    }

    @PatchMapping("/orders/{orderId}")
    public ResponseEntity<?> returnOrder(@RequestHeader(value="Authorization") String token, @PathVariable String orderId, @RequestBody OrderReturn orderReturn) {
        String customerId = this.tokenManager.validateToken(token);
        if (customerId == "") {
            return this.comicBookService.sendIsUnauthorized();
        }

        return this.orderService.patchOrderStatus(customerId, orderId, orderReturn);
    }
}
