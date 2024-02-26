package com.comiccomet.meteorshower.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.meteorshower.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    
}
