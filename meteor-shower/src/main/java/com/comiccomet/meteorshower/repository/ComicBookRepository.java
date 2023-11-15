package com.comiccomet.meteorshower.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.meteorshower.entity.ComicBook;

public interface ComicBookRepository extends JpaRepository<ComicBook, String> {
    
}
