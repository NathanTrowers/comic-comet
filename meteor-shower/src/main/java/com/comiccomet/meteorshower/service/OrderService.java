package com.comiccomet.meteorshower.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.comiccomet.meteorshower.constant.ErrorCodeConstants;
import com.comiccomet.meteorshower.constant.GeneralConstants;
import com.comiccomet.meteorshower.dto.ComicBookOrderResponse;
import com.comiccomet.meteorshower.dto.ErrorResponse;
import com.comiccomet.meteorshower.dto.ResponseLinkWrapper;
import com.comiccomet.meteorshower.dto.Self;
import com.comiccomet.meteorshower.entity.ComicBook;
import com.comiccomet.meteorshower.entity.ComicBookOrder;
import com.comiccomet.meteorshower.exception.ComicBookNotFoundException;
import com.comiccomet.meteorshower.exception.ComicBookUpdateFailedException;
import com.comiccomet.meteorshower.exception.PlaceNewOrderFailedException;
import com.comiccomet.meteorshower.repository.ComicBookOrderRepository;
import com.comiccomet.meteorshower.repository.ComicBookRepository;
import com.comiccomet.meteorshower.validator.ValidatorInterface;

@Service
public class OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);
    private final ComicBookRepository comicBookRepository;
    private final ComicBookOrderRepository comicBookOrderRepository;
    private final ValidatorInterface comicBookOrderValidator;

    public OrderService(ComicBookRepository comicBookRepository, ComicBookOrderRepository comicBookOrderRepository, ValidatorInterface comicBookOrderValidator) {
        this.comicBookRepository = comicBookRepository;
        this.comicBookOrderRepository = comicBookOrderRepository;
        this.comicBookOrderValidator = comicBookOrderValidator;
    }

    /* FOR THE TICKET WHERE THE DATE AND TIME NEED TO BE RETURNED;
    
    https://www.baeldung.com/java-string-to-timestamp
    */ 
    public ResponseEntity<?> placeNewOrder(String customerId, ComicBookOrder[] newOrder) {
        List<ComicBookOrder> placedOrders = new ArrayList<ComicBookOrder>();
        
        try  {
            int[] errorCodes = this.comicBookOrderValidator.validate(newOrder);
            if(errorCodes.length > 0) {
                log.error("Addition of new order for {} failed due to the following validation errors: {}", customerId, errorCodes);
             
                return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse(400, "bad request", errorCodes));
            }

            for(ComicBookOrder orderItem: newOrder) {               
                ComicBookOrder placedOrder = this.comicBookOrderRepository.save(orderItem);

                if (placedOrder == null) {
                    throw new PlaceNewOrderFailedException(newOrder);
                }

                placedOrders.add(placedOrder);
                
                String comicBookId = orderItem.getComicBookId();
                ComicBook comicBook = this.comicBookRepository.findByComicBookIdAndCarryStatus(comicBookId, GeneralConstants.CARRY_STATUS_CARRYING)
                    .orElseThrow(() ->  new ComicBookNotFoundException(comicBookId));
                int quantity = comicBook.getQuantity();
                comicBook.setQuantity(quantity-1);
                ComicBook updatedComicBook = this.comicBookRepository.save(comicBook);
                if (updatedComicBook == null) {
                    throw new ComicBookUpdateFailedException(updatedComicBook);
                }
            }

            ComicBookOrderResponse[] comicBookOrderResponse =  this.prepareComicBookOrderListResponse(placedOrders);

            log.info("Addition of new order for id {} successful!", customerId);

            return ResponseEntity
                .accepted()
                .body(new ResponseLinkWrapper(comicBookOrderResponse, new Self("http://localhost:8091/order/new")));
        } catch(PlaceNewOrderFailedException placeNewOrderFailedException) {
            log.error("Addition of new order for {} failed during the datbase operation with the following error: \n", customerId, placeNewOrderFailedException);
            
            int[] errorCodes = {ErrorCodeConstants.ERROR_POST_ORDER_FAILED};

            return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(400, "bad request", errorCodes));
        } catch(Exception error) {
            log.error("Addition of new order for {} failed with the following error: \n", customerId, error);
            
            int[] errorCodes = {ErrorCodeConstants.ERROR_POST_ORDER_FAILED};

            return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(400, "bad request", errorCodes));
        }
    }

    private ComicBookOrderResponse[] prepareComicBookOrderListResponse(List<ComicBookOrder> placedOrderArray) {
        ComicBookOrderResponse[] orderList = new  ComicBookOrderResponse[placedOrderArray.size()];
        for (int iterator = 0; iterator < placedOrderArray.size(); iterator++ ) {
            orderList[iterator] = new ComicBookOrderResponse(
                placedOrderArray.get(iterator).getOrderId(),
                placedOrderArray.get(iterator).getCustomerId(),
                placedOrderArray.get(iterator).getComicBookId(),
                placedOrderArray.get(iterator).getOrderDate(),
                placedOrderArray.get(iterator).getReturnStatus()
            );
        }

        return orderList;
    }
}
