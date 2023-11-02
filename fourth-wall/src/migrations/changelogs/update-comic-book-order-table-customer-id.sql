-- liquibase formatted sql

--changeset NathanTrowers:1 labels:customer-id,comic-book-order-table context:table-column-adjustment
ALTER TABLE comic_book_order
DROP FOREIGN KEY comic_book_order_ibfk_1;
ALTER TABLE comic_book_order
MODIFY COLUMN customer_id  varchar(255) NOT NULL;

--changeset NathanTrowers:2 labels:customer-id,customer-table context:table-column-adjustment
ALTER TABLE customer
MODIFY COLUMN customer_id  varchar(255) NOT NULL;

--changeset NathanTrowers:3 labels:customer-id,comic-book-order-table context:table-column-adjustment
ALTER TABLE comic_book_order
ADD FOREIGN KEY (customer_id) REFERENCES customer(customer_id);
