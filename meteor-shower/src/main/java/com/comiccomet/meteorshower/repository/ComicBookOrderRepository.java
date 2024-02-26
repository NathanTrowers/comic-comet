package com.comiccomet.meteorshower.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.meteorshower.entity.ComicBookOrder;
import com.comiccomet.meteorshower.entity.ComicBookOrderId;

public interface ComicBookOrderRepository extends JpaRepository<ComicBookOrder, ComicBookOrderId> {
    
}
