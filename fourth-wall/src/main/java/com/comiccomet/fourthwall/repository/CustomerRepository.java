package com.comiccomet.fourthwall.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.fourthwall.dto.RegistrationFields;
import com.comiccomet.fourthwall.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    
    Customer findByEmail(String email);

    Customer save(RegistrationFields registration);
}
