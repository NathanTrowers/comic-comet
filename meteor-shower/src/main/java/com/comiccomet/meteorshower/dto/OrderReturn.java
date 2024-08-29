package com.comiccomet.meteorshower.dto;

public class OrderReturn {
    String comicBookId;
    String returnStatus;
    
    public OrderReturn() {}

    public OrderReturn(String comicBookId, String returnStatus) {
        this.comicBookId = comicBookId;
        this.returnStatus = returnStatus;
    }

    public String getComicBookId() {
        return this.comicBookId;
    }

    public void setComicBookId(String comicBookId) {
        this.comicBookId = comicBookId;
    }

    public String getReturnStatus() {
        return this.returnStatus;
    }

    public void setReturnStatus(String returnStatus) {
        this.returnStatus = returnStatus;
    }

    @Override
    public String toString() {
        return "OrderReturn [comicBookId=" + this.comicBookId + ", returnStatus=" + this.returnStatus + "]";
    }
}
