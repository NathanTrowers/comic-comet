package com.comiccomet.meteorshower.service;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.comiccomet.meteorshower.constant.ErrorCodeConstants;
import com.comiccomet.meteorshower.controller.CustomerController;
import com.comiccomet.meteorshower.dto.AddressResponse;
import com.comiccomet.meteorshower.dto.ErrorResponse;
import com.comiccomet.meteorshower.entity.Customer;
import com.comiccomet.meteorshower.exception.CustomerNotFoundException;
import com.comiccomet.meteorshower.repository.CustomerRepository;

@Service
public class CustomerService {
    private static final Logger log = LoggerFactory.getLogger(CustomerService.class);
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public ResponseEntity<?> getSingleAddress(String customerId) {
        try {
            Customer customer = this.customerRepository.findById(customerId)
                .orElseThrow(() ->  new CustomerNotFoundException(customerId));

            log.info("Address retrieval successful for id {}!", customerId);
            
            AddressResponse addressResponse = new AddressResponse(
                customer.getAddress(),
                customer.getCity(),
                customer.getPostalCode(),
                customer.getCountry()
            );

            return ResponseEntity
                .ok()
                .body(EntityModel.of(addressResponse, 
                    linkTo(methodOn(CustomerController.class).getAddress(customerId)).withSelfRel()
                ));
        } catch(CustomerNotFoundException customerNotFoundException) {
            log.error("Address retrieval failed for id {} with the following error: ", customerId, customerNotFoundException);

            int[] errorCodes = {ErrorCodeConstants.ERROR_CUSTOMER_NOT_FOUND};

            return ResponseEntity
                .status(404)
                .body(new ErrorResponse(404, "not found", errorCodes));
        } catch(Exception error) {
            log.error("Address retrieval failed for id {} with the following error: ", customerId, error);

            int[] errorCodes = {ErrorCodeConstants.ERROR_GET_ADDRESS_FAILED};

            return ResponseEntity
                .status(404)
                .body(new ErrorResponse(404, "not found", errorCodes));
        }
    }

}
