package com.comiccomet.meteorshower.entity;

import java.sql.Timestamp;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="comic_book_order")
@IdClass(ComicBookOrderId.class)
public class ComicBookOrder {
    @Id
    private String orderId;
    @Id
    private String comicBookId;
    private String customerId;
    private Timestamp orderDate;
    private String returnStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "comicBookId", insertable = false)
    private ComicBook comicBook;

    public ComicBookOrder() {}

    public ComicBookOrder(String orderId, String customerId, String comicBookId,
        Timestamp orderDate, String returnStatus
    ) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.comicBookId = comicBookId;
        this.orderDate = orderDate;
        this.returnStatus = returnStatus;
    }

    public ComicBook getComicBook() {
        return this.comicBook;
    }

    public String getOrderId() {
        return this.orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCustomerId() {
        return this.customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getComicBookId() {
        return this.comicBookId;
    }

    public void setComicBookId(String comicBookId) {
        this.comicBookId = comicBookId;
    }

    public Timestamp getOrderDate() {
        return this.orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public String getReturnStatus() {
        return this.returnStatus;
    }

    public void setReturnStatus(String returnStatus) {
        this.returnStatus = returnStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.orderId, this.customerId, this.comicBookId,
            this.orderDate, this.returnStatus);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (!(object instanceof ComicBookOrder)) {
            return false;
        }

        ComicBookOrder comicBookOrder = (ComicBookOrder) object;

        return Objects.equals(this.orderId , comicBookOrder.orderId)
            && Objects.equals(this.customerId , comicBookOrder.customerId)
            && Objects.equals(this.comicBookId , comicBookOrder.comicBookId)
            && Objects.equals(this.orderDate , comicBookOrder.orderDate)
            && Objects.equals(this.returnStatus , comicBookOrder.returnStatus);
    }

    @Override
    public String toString() {
        return "ComicBookOrder [orderId=" + this.orderId + ", customerId=" + this.customerId + ", comicBookId=" + this.comicBookId
                + ", orderDate=" + this.orderDate + ", returnStatus='" + this.returnStatus + "'']";
    }
}
