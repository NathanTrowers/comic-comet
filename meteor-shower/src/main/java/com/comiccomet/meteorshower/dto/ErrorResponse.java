package com.comiccomet.meteorshower.dto;

public record ErrorResponse(int status, String message, int[] errorCodes) {}
