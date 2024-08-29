package com.comiccomet.fourthwall.dto;

public record LoginResponse(int status, String response, int[] errorCodes) {}
