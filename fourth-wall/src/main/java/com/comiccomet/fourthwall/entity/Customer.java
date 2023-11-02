package com.comiccomet.fourthwall.entity;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Customer extends User {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String customerId;
    private String email;
    private String name;
    private String password;
    private String address;
    private String city;
    private String postalCode;
    private String country;

    public Customer() {}

    public Customer(String email, String name, String password) {
        this(email, name, password, "12 Sage Mountain Way", "Toronto", "M2B 3S3", "Canada");
    }

    public Customer(String email, String name, String password,
        String address, String city, String postalCode,
        String country
    ) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            this.customerId, this.email, this.name,
            this.password, this.address, this.city,
            this.postalCode, this.country
        );
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (!(object instanceof Customer)) {
            return false;
        }
        Customer Customer = (Customer) object;

        return Objects.equals(this.customerId, Customer.customerId)
            && Objects.equals(this.email, Customer.email)
            && Objects.equals(this.name, Customer.name)
            && Objects.equals(this.password, Customer.password)
            && Objects.equals(this.address, Customer.address)
            && Objects.equals(this.city, Customer.city)
            && Objects.equals(this.postalCode, Customer.postalCode)
            && Objects.equals(this.country, Customer.country);
    }

    @Override
    public String toString() {
        return "Customer [CustomerId=" + this.customerId + ", email= '" + this.email +
            "', name= '" + this.name + "', password=" + this.password + "', address=" + this.address +
            "', city=" + this.city + "', postalCode=" + this.postalCode + "', country=" + this.country + "]";
    }
}
