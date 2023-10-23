package com.comiccomet.fourthwall.entity;

import java.util.Objects;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Admin {
    private @Id UUID adminId;
    private String email;
    private String name;
    private String password;

    public Admin() {}

    public Admin(String email, String name, String password) {
        this(UUID.randomUUID(), email, name, password);
    }

    public Admin(UUID adminId, String email, String name, String password) {
        this.adminId = adminId;
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public UUID getAdminId() {
        return adminId;
    }

    public void setAdminId(UUID adminId) {
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
        return "Admin [adminId=" + adminId + ", email= '" + email + "', name= '" + name + "', password=" + password + "]";
    }
}
