package com.comiccomet.sagecave.dto;

public record ErrorResponse(int status, String message, int[] errorCodes) {}
