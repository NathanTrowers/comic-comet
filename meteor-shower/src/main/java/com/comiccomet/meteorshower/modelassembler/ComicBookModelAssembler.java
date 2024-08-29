package com.comiccomet.meteorshower.modelassembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.comiccomet.meteorshower.controller.ComicBookController;
import com.comiccomet.meteorshower.entity.ComicBook;

@Component
public class ComicBookModelAssembler implements RepresentationModelAssembler<ComicBook, EntityModel<ComicBook>> {
   
    @Override
    public EntityModel<ComicBook> toModel(ComicBook comicBook) {
        return EntityModel.of(comicBook, 
            linkTo(methodOn(ComicBookController.class).getComicBook("exampleInvalidToken", comicBook.getComicBookId())).withSelfRel(),
            linkTo(methodOn(ComicBookController.class).getAllComicBooks("exampleInvalidToken")).withRel("comicBooks")
        );
    }
}
