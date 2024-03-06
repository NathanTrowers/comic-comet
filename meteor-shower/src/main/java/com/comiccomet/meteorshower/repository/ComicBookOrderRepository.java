package com.comiccomet.meteorshower.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.comiccomet.meteorshower.entity.ComicBookOrder;
import com.comiccomet.meteorshower.entity.ComicBookOrderId;

public interface ComicBookOrderRepository extends JpaRepository<ComicBookOrder, ComicBookOrderId> {
    List<ComicBookOrder> findAllByCustomerId(String customerId);

    ComicBookOrder findComicBooksByOrderIdAndComicBookId(String orderId, String comicBookId);

    @Modifying
    @Transactional
    @Query("update ComicBookOrder c set c.returnStatus = ?1 where c.comicBookId = ?2 and c.orderId = ?3")
    int setReturnStatusFor(String returnStatus, String comicBookId, String orderId);
}
