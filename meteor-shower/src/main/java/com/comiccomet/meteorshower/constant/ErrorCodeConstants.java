package com.comiccomet.meteorshower.constant;

// format: http code (eg:400), feature classification(eg: 003), error code number (eg: 002)
// fully formatted example: 400003002
public final class ErrorCodeConstants {
    public static final int ERROR_GET_CATALOGUE_FAILED = 400003001;
    public static final int ERROR_GET_COMIC_BOOK_FAILED = 400003002;
    public static final int ERROR_COMIC_BOOK_NOT_FOUND = 400003003;
    public static final int ERROR_UNAUTHORIZED_REQUEST = 400003004;
    public static final int ERROR_POST_ORDER_FAILED = 400003005;
    public static final int ERROR_WRONG_ORDER_ID_FORMAT = 400003006;
    public static final int ERROR_WRONG_CUSTOMER_ID_FORMAT = 400003007;
    public static final int ERROR_WRONG_COMIC_BOOK_ID_FORMAT = 400003008;
    public static final int ERROR_WRONG_ORDER_DATE_FORMAT = 400003009;
    public static final int ERROR_WRONG_RETURN_STATUS_FORMAT = 400003010;
    public static final int ERROR_COMIC_BOOK_OUT_OF_STOCK = 400003011;
}
