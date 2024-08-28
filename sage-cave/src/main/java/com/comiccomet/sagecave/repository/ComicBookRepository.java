package com.comiccomet.sagecave.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comiccomet.sagecave.entity.ComicBook;

public interface ComicBookRepository extends JpaRepository<ComicBook, String> {
    
}
