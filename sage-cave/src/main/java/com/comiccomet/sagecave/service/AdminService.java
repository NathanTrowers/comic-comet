package com.comiccomet.sagecave.service;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.comiccomet.sagecave.constant.ErrorCodeConstants;
import com.comiccomet.sagecave.controller.AdminController;
import com.comiccomet.sagecave.dto.ErrorResponse;
import com.comiccomet.sagecave.entity.ComicBook;
import com.comiccomet.sagecave.exception.ComicBookNotFoundException;
import com.comiccomet.sagecave.modelassembler.ComicBookModelAssembler;
import com.comiccomet.sagecave.repository.ComicBookRepository;

@Service
public class AdminService {
    private static final Logger log = LoggerFactory.getLogger(AdminService.class);
    private final ComicBookRepository comicBookRepository;
    private final ComicBookModelAssembler comicBookModelAssembler;

    public AdminService(ComicBookRepository comicBookRepository, ComicBookModelAssembler comicBookModelAssembler) {
        this.comicBookRepository = comicBookRepository;
        this.comicBookModelAssembler = comicBookModelAssembler;
    }

    public ResponseEntity<ErrorResponse> sendIsUnauthorized() {
        log.error("User Authorization failed! Rejecting request.");
        
        int[] errorCodes = {ErrorCodeConstants.ERROR_UNAUTHORIZED_REQUEST};

        return ResponseEntity
            .status(401)
            .body(new ErrorResponse(401, "unauthorized", errorCodes));
    }

    public ResponseEntity<?> getComicBookCatalogue(String adminId) {
        try {
            List<EntityModel<ComicBook>> comicBooks = comicBookRepository.findAll()
                .stream()
                .map(comicBookModelAssembler::toModel)
                .collect(Collectors.toList());

            log.info("Comic book catalogue retrieval successful for id {}!", adminId);

            return ResponseEntity
                .ok()
                .body(CollectionModel.of(comicBooks,
                    linkTo(methodOn(AdminController.class).getAllComicBooks("exampleInvalidToken")).withSelfRel()));
        } catch(Exception error) {
            log.error("Comic book catalogue retrieval failed with the following error: \n", error);
            
            int[] errorCodes = {ErrorCodeConstants.ERROR_GET_CATALOGUE_FAILED};

            return ResponseEntity
                .status(404)
                .body(new ErrorResponse(404, "not found", errorCodes));
        }
    }

    public ResponseEntity<?> getSingleComicBook(String adminId, String comicBookId) {
        try {
            ComicBook comicBook = this.comicBookRepository.findById(comicBookId)
                .orElseThrow(() ->  new ComicBookNotFoundException(comicBookId));

            log.info("Comic book retrieval successful for id {}!", adminId);

            return ResponseEntity
                .ok()
                .body(comicBookModelAssembler.toModel(comicBook));
        } catch(ComicBookNotFoundException comicBookNotFoundException) {
            log.error("Comic book retrieval failed for id {} with the following error: ", adminId, comicBookNotFoundException);

            int[] errorCodes = {ErrorCodeConstants.ERROR_COMIC_BOOK_NOT_FOUND};

            return ResponseEntity
                .status(404)
                .body(new ErrorResponse(404, "not found", errorCodes));
        } catch(Exception error) {
            log.error("Comic book retrieval failed for id {} with the following error: {}", adminId, error);

            int[] errorCodes = {ErrorCodeConstants.ERROR_GET_COMIC_BOOK_FAILED};

            return ResponseEntity
                .status(404)
                .body(new ErrorResponse(404, "not found", errorCodes));
        }
    }
}
