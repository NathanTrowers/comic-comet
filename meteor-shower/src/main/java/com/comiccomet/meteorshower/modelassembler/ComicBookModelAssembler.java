package com.comiccomet.meteorshower.modelassembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.comiccomet.meteorshower.controller.CustomerController;
import com.comiccomet.meteorshower.entity.ComicBook;

@Component
public class ComicBookModelAssembler implements RepresentationModelAssembler<ComicBook, EntityModel<ComicBook>> {
   
    @Override
    public EntityModel<ComicBook> toModel(ComicBook comicBook) {
        return EntityModel.of(comicBook, 
            linkTo(methodOn(CustomerController.class).getComicBook("exampleInvalidToken", comicBook.getComicBookId())).withSelfRel(),
            linkTo(methodOn(CustomerController.class).getAllComicBooks("exampleInvalidToken")).withRel("comicBooks")
        );
    }
}
