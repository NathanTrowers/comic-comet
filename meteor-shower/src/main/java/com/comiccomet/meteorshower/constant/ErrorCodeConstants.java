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
    public static final int ERROR_CUSTOMER_NOT_FOUND = 400003012;
    public static final int ERROR_GET_ADDRESS_FAILED = 400003013;
    public static final int ERROR_PATCH_ADDRESS_FAILED = 400003014;
    public static final int ERROR_WRONG_ADDRESS_FORMAT = 400003015;
    public static final int ERROR_WRONG_CITY_FORMAT = 400003016;
    public static final int ERROR_WRONG_POSTAL_CODE_FORMAT = 400003017;
    public static final int ERROR_WRONG_COUNTRY_FORMAT = 400003018;
    public static final int ERROR_ADDRESS_UNCHANGED = 400003019;
    public static final int ERROR_GET_PAST_ORDERS_FAILED = 400003020;
    public static final int ERROR_PATCH_ORDER_RETURN_FAILED = 400003021;
}
