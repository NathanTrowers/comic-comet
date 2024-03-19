package com.comiccomet.shootingstar.dto;

public record ErrorResponse(int status, String errorMessage, int[] errorCodes) {}
