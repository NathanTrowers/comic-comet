package com.comiccomet.shootingstar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.shootingstar.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    
}   
