package com.comiccomet.meteorshower.entity;

import java.io.Serializable;
import java.util.Objects;

public class ComicBookOrderId implements Serializable {
    private String orderId;
    private String comicBookId;

    public ComicBookOrderId() {}

    public ComicBookOrderId(String orderId, String comicBookId) {
        this.orderId = orderId;
        this.comicBookId = comicBookId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.orderId, this.comicBookId);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (!(object instanceof ComicBookOrder)) {
            return false;
        }

        ComicBookOrderId comicBookOrderId = (ComicBookOrderId) object;

        return Objects.equals(this.orderId , comicBookOrderId.orderId)
            && Objects.equals(this.comicBookId , comicBookOrderId.comicBookId);
    }
}
