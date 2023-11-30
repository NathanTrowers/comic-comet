package com.comiccomet.sagecave.validator;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;

import com.comiccomet.sagecave.constant.ErrorCodeConstants;
import com.comiccomet.sagecave.entity.ComicBook;

@Component
public class NewComicBookValidator implements ValidatorInterface {
    public int[] validate(Object payload) {
        ComicBook newComicBook = (ComicBook) payload;
        ArrayList<Integer> errorCodes = new ArrayList<Integer>();
        Pattern namePattern = Pattern.compile("^[0-9a-zA-Z-' ]{1,50}?$");
        Pattern authorPattern = Pattern.compile("^[0-9a-zA-Z-' ]{1,50}?$");
        Pattern pricePattern = Pattern.compile("^[0-9]{1,3}.[0-9]{2}?$");
        Pattern quantityPattern = Pattern.compile("^[0-9]{1,3}?$");
        Pattern carryStatusPattern = Pattern.compile("^(carrying|discontinued)$");
        Matcher nameMatcher = namePattern.matcher(newComicBook.getName());
        Matcher authorMatcher = authorPattern.matcher(newComicBook.getAuthor());
        Matcher priceMatcher = pricePattern.matcher(Float.toString(newComicBook.getPrice()));
        Matcher quantityMatcher = quantityPattern.matcher(Integer.toString(newComicBook.getQuantity()));
        Matcher carryStatusMatcher = carryStatusPattern.matcher(newComicBook.getCarryStatus());
        boolean isNameMatch = nameMatcher.find();
        boolean isAuthorMatch = authorMatcher.find();
        boolean isPriceMatch = priceMatcher.find();
        boolean isQuantityMatch = quantityMatcher.find();
        boolean isCarryStatusMatch = carryStatusMatcher.find();

        if (!isNameMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_NAME_FORMAT);
        }
        if (!isAuthorMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_AUTHOR_FORMAT);
        }
        if (!isPriceMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_PRICE_FORMAT);
        }
        if (!isQuantityMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_QUANTITY_FORMAT);
        }
        if (!isCarryStatusMatch) {
            errorCodes.add(ErrorCodeConstants.ERROR_WRONG_CARRY_STATUS_FORMAT);
        }

        byte[] coverArt = newComicBook.getCoverArt();

        if  (!(coverArt == null)) {
            try {
                FileUtils.writeByteArrayToFile(new File("../../../../resources/static/testFile.png"), coverArt);
            } catch (IOException error) {
                error.printStackTrace(); //Add logging later on
            }
            
            File newFile = FileUtils.getFile(new File("../../../../resources/static"), "testFile.png");
            
            if (newFile == null) {
                errorCodes.add(ErrorCodeConstants.ERROR_INVALID_COVER_ART);
            }
        }

        return errorCodes.stream()
            .mapToInt(Integer::intValue)
            .toArray();
    }
}
// https://www.baeldung.com/java-base64-image-string
