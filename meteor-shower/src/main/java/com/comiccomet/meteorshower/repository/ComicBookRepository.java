package com.comiccomet.meteorshower.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.meteorshower.entity.ComicBook;

public interface ComicBookRepository extends JpaRepository<ComicBook, String> {
    
    List<ComicBook> findAllByCarryStatus(String carryStatus);

    Optional<ComicBook> findByComicBookIdAndCarryStatus(String comicBookId, String carryStatus);
}
