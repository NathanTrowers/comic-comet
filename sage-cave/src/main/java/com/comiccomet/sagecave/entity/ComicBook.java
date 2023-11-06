package com.comiccomet.sagecave.entity;

import java.util.Arrays;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ComicBook {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String comicBookId;
    private String name;
    private String author;
    private float price;
    private int quantity;
    private byte[] coverArt;
    private String carryStatus;

    public ComicBook() {}

    public ComicBook(String name, String author, float price,
        int quantity, byte[] coverArt, String carryStatus
    ) {
        this.name = name;
        this.author = author;
        this.price = price;
        this.quantity = quantity;
        this.coverArt = coverArt;
        this.carryStatus = carryStatus;
    }

    public String getComicBookId() {
        return comicBookId;
    }

    public void setComicBookId(String comicBookId) {
        this.comicBookId = comicBookId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public byte[] getCoverArt() {
        return coverArt;
    }

    public void setCoverArt(byte[] coverArt) {
        this.coverArt = coverArt;
    }

    public String getCarryStatus() {
        return carryStatus;
    }

    public void setCarryStatus(String carryStatus) {
        this.carryStatus = carryStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.comicBookId, this.name, this.author,
            this.price, this.quantity, this.coverArt,
            this.carryStatus);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (!(object instanceof ComicBook)) {
            return false;
        }

        ComicBook comicBook = (ComicBook) object;

        return Objects.equals(this.comicBookId, comicBook.comicBookId)
            && Objects.equals(this.name, comicBook.name)
            && Objects.equals(this.author, comicBook.author)
            && Objects.equals(this.price, comicBook.price)
            && Objects.equals(this.quantity, comicBook.quantity)
            && Objects.equals(this.coverArt, comicBook.coverArt)
            && Objects.equals(this.carryStatus, comicBook.carryStatus);
    }

    @Override
    public String toString() {
        return "ComicBook [comicBookId=" + comicBookId + ", name='" + name +
            "', author='" + author + "', price='" + price + "', quantity='" + quantity +
            "', coverArt='" + Arrays.toString(coverArt) + "', carryStatus='" + carryStatus + "']";
    }
}
