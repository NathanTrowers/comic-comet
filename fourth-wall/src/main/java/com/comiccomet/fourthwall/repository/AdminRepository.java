package com.comiccomet.fourthwall.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.fourthwall.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, UUID>{

    Admin findByEmail(String email);
    
}
