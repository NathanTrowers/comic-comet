package com.comiccomet.fourthwall.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.fourthwall.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, String> {

    Admin findByEmail(String email);
}
