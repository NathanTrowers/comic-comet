package com.comiccomet.fourthwall.dto;

import org.springframework.stereotype.Component;

@Component
public class RegistrationFields {

    private String email;
    private String name;
    private String password;

    public RegistrationFields() {}

    public RegistrationFields(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
