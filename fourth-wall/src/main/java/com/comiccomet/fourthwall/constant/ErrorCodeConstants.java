package com.comiccomet.fourthwall.constant;

// format: http code (eg:400), feature classification(eg: 001), error code number (eg: 002)
// fully formatted example: 400001002
public final class ErrorCodeConstants {
    public static final int ERROR_WRONG_EMAIL_FORMAT = 400001001;
    public static final int ERROR_WRONG_PASSWORD_FORMAT = 400001002;
    public static final int ERROR_INVALID_EMAIL = 400001003;
    public static final int ERROR_INVALID_PASSWORD = 400001004;
    public static final int ERROR_WRONG_NAME_FORMAT = 400001005;
    public static final int ERROR_SAVE_REGISTRATION_FAILED = 400001006;
    public static final int ERROR_CUSTOMER_ALREADY_EXISTS = 400001007;
}
