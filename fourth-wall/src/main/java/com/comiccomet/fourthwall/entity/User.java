package com.comiccomet.fourthwall.entity;

import java.util.Objects;

public class User {
    private String email;
    private String name;
    private String password;

    public User() {}

    public User(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.email, this.name, this.password);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (!(object instanceof User)) {
            return false;
        }
        User user = (User) object;

        return Objects.equals(this.email, user.email)
            && Objects.equals(this.name, user.name)
            && Objects.equals(this.password, user.password);
    }

    @Override
    public String toString() {
        return "Admin [email= '" + email + "', name= '" + name + "', password=" + password + "]";
    }
}
