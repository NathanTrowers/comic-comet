package com.comiccomet.meteorshower.dto;

import java.sql.Timestamp;

public class ComicBookOrderResponse {
    private String orderId;
    private String customerId;
    private String comicBookId;
    private Timestamp orderDate;
    private String returnStatus;

    public ComicBookOrderResponse() {}

    public ComicBookOrderResponse(String orderId, String customerId, String comicBookId,
        Timestamp timestamp, String returnStatus
    ) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.comicBookId = comicBookId;
        this.orderDate = timestamp;
        this.returnStatus = returnStatus;
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
    public String toString() {
        return "ComicBookOrder [orderId=" + this.orderId + ", customerId=" + this.customerId + ", comicBookId=" + this.comicBookId
                + ", orderDate=" + this.orderDate + ", returnStatus='" + this.returnStatus + "'']";
    }
}
