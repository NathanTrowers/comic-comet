package com.comiccomet.fourthwall.entity;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin extends User {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String adminId;
    private String email;
    private String name;
    private String password;

    public Admin() {}

    public Admin(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
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
        return Objects.hash(this.adminId, this.email, this.name, this.password);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (!(object instanceof Admin)) {
            return false;
        }
        Admin admin = (Admin) object;

        return Objects.equals(this.adminId, admin.adminId)
            && Objects.equals(this.email, admin.email)
            && Objects.equals(this.name, admin.name)
            && Objects.equals(this.password, admin.password);
    }

    @Override
    public String toString() {
        return "Admin [adminId=" + this.adminId + ", email= '" + this.email +
        "', name= '" + this.name + "', password=" + this.password + "]";
    }
}
