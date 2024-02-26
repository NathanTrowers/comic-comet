-- liquibase formatted sql

--changeset NathanTrowers:1 labels:comic-book-table context:table-population-addition-binary-barons-2
INSERT INTO comic_book (comic_book_id, name, author, price, quantity, cover_art, carry_status)
VALUES ('07214ea4-92ba-4cdc-8e35-5c3c58dfa930', 'Binary Barons 2', 'Morpheus', 99.99, 99, null, 'carrying');
--rollback DELETE FROM comic_book WHERE name = 'binary barons 2' ;
