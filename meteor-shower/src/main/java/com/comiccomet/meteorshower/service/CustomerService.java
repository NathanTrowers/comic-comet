package com.comiccomet.meteorshower.service;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.comiccomet.meteorshower.constant.ErrorCodeConstants;
import com.comiccomet.meteorshower.controller.CustomerController;
import com.comiccomet.meteorshower.dto.Address;
import com.comiccomet.meteorshower.dto.ErrorResponse;
import com.comiccomet.meteorshower.entity.Customer;
import com.comiccomet.meteorshower.exception.AddressUnchangedException;
import com.comiccomet.meteorshower.exception.CustomerNotFoundException;
import com.comiccomet.meteorshower.repository.CustomerRepository;
import com.comiccomet.meteorshower.validator.CustomerValidatorInterface;

@Service
public class CustomerService {
    private static final Logger log = LoggerFactory.getLogger(CustomerService.class);
    private final CustomerRepository customerRepository;
    private final CustomerValidatorInterface customerValidator;

    public CustomerService(CustomerRepository customerRepository, CustomerValidatorInterface customerValidator) {
        this.customerRepository = customerRepository;
        this.customerValidator = customerValidator;
    }

    public ResponseEntity<?> getSingleAddress(String customerId) {
        try {
            Customer customer = this.customerRepository.findById(customerId)
                .orElseThrow(() ->  new CustomerNotFoundException(customerId));

            log.info("Address retrieval successful for id {}!", customerId);
            
            Address addressResponse = new Address(
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

    public ResponseEntity<?> patchSingleAddress(String customerId, Address address) {
        try {
            int[] errorCodes = this.customerValidator.validateAddress(address);
            if(errorCodes.length > 0) {
                log.error("Addition of new order for {} failed due to the following validation errors: {}", customerId, errorCodes);
             
                return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse(400, "bad request", errorCodes));
            }

            Customer customerToModify = this.customerRepository.findById(customerId)
                .orElseThrow(() ->  new CustomerNotFoundException(customerId));
            
            String addressString = address.address();
            String cityString = address.city();
            String countryString = address.country();
            String postalCodeString = address.postalCode().toUpperCase();

            if (Objects.equals(customerToModify.getAddress(), addressString)
                && Objects.equals(customerToModify.getCity(), cityString)
                && Objects.equals(customerToModify.getPostalCode(), postalCodeString)
                && Objects.equals(customerToModify.getCountry(), countryString)
            ) {
                throw new AddressUnchangedException(address);
            }

            customerToModify.setAddress(addressString);
            customerToModify.setCity(cityString);
            customerToModify.setCountry(countryString);
            customerToModify.setPostalCode(postalCodeString);

            Customer updatedCustomer = this.customerRepository.save(customerToModify);

            Address addressResponse = new Address(
                updatedCustomer.getAddress(),
                updatedCustomer.getCity(),
                updatedCustomer.getPostalCode(),
                updatedCustomer.getCountry()
            );

            log.info("Address update successful for id {}!", customerId);

            return ResponseEntity
                .accepted()
                .body(EntityModel.of(addressResponse, 
                    linkTo(methodOn(CustomerController.class).getAddress(customerId)).withSelfRel()
                ));
        } catch(CustomerNotFoundException customerNotFoundException) {
            log.error("Address update failed for id {} with the following error: ", customerId, customerNotFoundException);

            int[] errorCodes = {ErrorCodeConstants.ERROR_CUSTOMER_NOT_FOUND};

            return ResponseEntity
                .status(404)
                .body(new ErrorResponse(404, "not found", errorCodes));
        } catch(AddressUnchangedException addressUnchangedException) {
            log.error("Address update failed for id {} with the following error: ", customerId, addressUnchangedException);

            int[] errorCodes = {ErrorCodeConstants.ERROR_ADDRESS_UNCHANGED};

            return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(400, "bad request", errorCodes));
        } catch(Exception error) {
            log.error("Address update failed for id {} with the following error: ", customerId, error);

            int[] errorCodes = {ErrorCodeConstants.ERROR_PATCH_ADDRESS_FAILED};

            return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(400, "bad request", errorCodes));
        }
    }
}
