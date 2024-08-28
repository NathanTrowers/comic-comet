package com.comiccomet.fourthwall.dto;

import org.springframework.stereotype.Component;

@Component
public class LoginCredentials {
    
    private String email;
    private String password;

    public LoginCredentials(){}

    public LoginCredentials(String email, String passsword) {
        this.email = email;
        this.password = passsword;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
