package com.comiccomet.meteorshower.validator;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import com.comiccomet.meteorshower.constant.ErrorCodeConstants;
import com.comiccomet.meteorshower.constant.GeneralConstants;
import com.comiccomet.meteorshower.dto.OrderReturn;
import com.comiccomet.meteorshower.entity.ComicBook;
import com.comiccomet.meteorshower.entity.ComicBookOrder;
import com.comiccomet.meteorshower.exception.ComicBookNotFoundException;
import com.comiccomet.meteorshower.repository.ComicBookRepository;

@Component
public class ComicBookOrderValidator implements ComicBookOrderValidatorInterface {
    private final ComicBookRepository comicBookRepository;

    public ComicBookOrderValidator(ComicBookRepository comicBookRepository) {
        this.comicBookRepository = comicBookRepository;
    }

    public int[] validate(Object payload) {
        ComicBookOrder[] newOrder = (ComicBookOrder[]) payload;
        ArrayList<Integer> errorCodes = new ArrayList<Integer>();

        for(ComicBookOrder orderItem: newOrder) {
            String comicBookId = orderItem.getComicBookId();
            Pattern idPattern = Pattern.compile("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$");
            Pattern orderDatePattern = Pattern.compile("^2[0-9]{3}-(0[1-9]|1[012])-([012][0-9]|3[01]) ([01][0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9].[0-9]{1,3}?$"); //yyyy-[m]m-[d]d hh:mm:ss.f[ff] || null
            Pattern returnStatusPattern = Pattern.compile("^none$");
            Matcher orderIdMatcher = idPattern.matcher(orderItem.getOrderId());
            Matcher customerIdMatcher = idPattern.matcher(orderItem.getCustomerId());
            Matcher comicBookIdMatcher = idPattern.matcher(comicBookId);
            Matcher orderDateMatcher = orderDatePattern.matcher(orderItem.getOrderDate().toString());
            Matcher returnStatusMatcher = returnStatusPattern.matcher(orderItem.getReturnStatus());
            boolean isOrderIdMatch = orderIdMatcher.find();
            boolean isCustomerIdMatch = customerIdMatcher.find();
            boolean isComicBookIdMatch = comicBookIdMatcher.find();
            boolean isOrderDateMatch = orderDateMatcher.find();
            boolean isReturnStatusMatch = returnStatusMatcher.find();

            if (!isOrderIdMatch) {
                errorCodes.add(ErrorCodeConstants.ERROR_WRONG_ORDER_ID_FORMAT);
            }
            if (!isCustomerIdMatch) {
                errorCodes.add(ErrorCodeConstants.ERROR_WRONG_CUSTOMER_ID_FORMAT);
            }
            if (!isComicBookIdMatch) {
                errorCodes.add(ErrorCodeConstants.ERROR_WRONG_COMIC_BOOK_ID_FORMAT);
            }
            if (!isOrderDateMatch) {
                errorCodes.add(ErrorCodeConstants.ERROR_WRONG_ORDER_DATE_FORMAT);
            }
            if (!isReturnStatusMatch) {
                errorCodes.add(ErrorCodeConstants.ERROR_WRONG_RETURN_STATUS_FORMAT);
            }

            if (isOrderIdMatch
                && isCustomerIdMatch
                && isComicBookIdMatch
                && isOrderDateMatch
                && isReturnStatusMatch
            ) {
                ComicBook comicBook = this.comicBookRepository.findByComicBookIdAndCarryStatus(comicBookId, GeneralConstants.CARRY_STATUS_CARRYING)
                    .orElseThrow(() ->  new ComicBookNotFoundException(comicBookId));
                if (comicBook.getQuantity() == 0) {
                    errorCodes.add(ErrorCodeConstants.ERROR_COMIC_BOOK_OUT_OF_STOCK);
                }
            }
        }

        return errorCodes.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }

    public int[] validateOrderReturn(OrderReturn orderReturn) {
        ArrayList<Integer> errorCodes = new ArrayList<Integer>();
        String comicBookId = orderReturn.getComicBookId();

        Pattern idPattern = Pattern.compile("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$");
        Pattern returnStatusPattern = Pattern.compile("^return$");
        Matcher comicBookIdMatcher = idPattern.matcher(comicBookId);
        Matcher returnStatusMatcher = returnStatusPattern.matcher(orderReturn.getReturnStatus());
        boolean isComicBookIdMatch = comicBookIdMatcher.find();
        boolean isReturnStatusMatch = returnStatusMatcher.find();

        if (!isComicBookIdMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_COMIC_BOOK_ID_FORMAT);
        }
        if (!isReturnStatusMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_RETURN_STATUS_FORMAT);
        }

        return errorCodes.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
