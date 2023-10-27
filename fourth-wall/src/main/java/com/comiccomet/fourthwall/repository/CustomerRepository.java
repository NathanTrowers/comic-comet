package com.comiccomet.fourthwall.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.fourthwall.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    
    Customer findByEmail(String email);
}
