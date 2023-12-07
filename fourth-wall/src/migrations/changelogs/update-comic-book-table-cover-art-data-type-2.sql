-- liquibase formatted sql

--changeset NathanTrowers:1 labels:cover-art,comic-book-table context:table-column-adjustment
ALTER TABLE comic_book
MODIFY COLUMN cover_art varbinary(45400);
