package com.comiccomet.sagecave.constant;

// format: http code (eg:400), feature classification(eg: 002), error code number (eg: 002)
// fully formatted example: 400002002
public final class ErrorCodeConstants {
    public static final int ERROR_GET_CATALOGUE_FAILED = 400002001;
    public static final int ERROR_GET_COMIC_BOOK_FAILED = 400002002;
    public static final int ERROR_COMIC_BOOK_NOT_FOUND = 400002003;
    public static final int ERROR_UNAUTHORIZED_REQUEST = 400002004;
    public static final int ERROR_ADD_COMIC_BOOK_FAILED = 400002005;
    public static final int ERROR_WRONG_COMIC_BOOK_ID_FORMAT = 400002006;
    public static final int ERROR_WRONG_NAME_FORMAT =  400002007;
    public static final int ERROR_WRONG_AUTHOR_FORMAT = 400002008;
    public static final int ERROR_WRONG_PRICE_FORMAT = 400002009;
    public static final int ERROR_WRONG_QUANTITY_FORMAT = 400002010;
    public static final int ERROR_WRONG_CARRY_STATUS_FORMAT = 400002011;
    public static final int ERROR_INVALID_COVER_ART = 400002012;
    public static final int ERROR_UPDATE_COMIC_BOOK_FAILED = 400002013;
    public static final int ERROR_DELETE_COMIC_BOOK_FAILED = 400002014;
}
