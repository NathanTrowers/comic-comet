-- liquibase formatted sql

--changeset NathanTrowers:1 labels:comic-book-table-additon context:table-population
--comment: accepts BLOBs
INSERT INTO comic_book (comic_book_id, name, author, price, quantity, cover_art, carry_status)
VALUES ('6969a34d-7c1a-42ed-461f-83e31e7c8f34', 'Coiling Dragon Fandom 1', 'The Fangirls', 108.00, 108, null, 'discontinued');
--rollback DELETE FROM comic_book WHERE name = 'Coiling Dragon Fandom 1';
