package com.comiccomet.sagecave.modelassembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.comiccomet.sagecave.controller.AdminController;
import com.comiccomet.sagecave.entity.ComicBook;

@Component
public class ComicBookModelAssembler implements RepresentationModelAssembler<ComicBook, EntityModel<ComicBook>> {
   
    @Override
    public EntityModel<ComicBook> toModel(ComicBook comicBook) {
        return EntityModel.of(comicBook, 
            linkTo(methodOn(AdminController.class).getComicBook("exampleInvalidToken", comicBook.getComicBookId())).withSelfRel(),
            linkTo(methodOn(AdminController.class).getAllComicBooks("exampleInvalidToken")).withRel("comicBooks")
        );
    }
}
