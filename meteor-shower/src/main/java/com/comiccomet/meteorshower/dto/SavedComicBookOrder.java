package com.comiccomet.meteorshower.dto;

import java.sql.Timestamp;

import com.comiccomet.meteorshower.entity.ComicBook;

public record SavedComicBookOrder(String orderId,
    Timestamp orderDate, String returnStatus, ComicBook comicBook) {}
