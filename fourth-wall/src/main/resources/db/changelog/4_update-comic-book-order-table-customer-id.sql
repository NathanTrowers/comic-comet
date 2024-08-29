-- liquibase formatted sql

--changeset NathanTrowers:1 labels:customer-id,comic-book-order-table context:table-column-adjustment
ALTER TABLE comic_book_order
DROP FOREIGN KEY fk_customer_id_comic_book_order;
ALTER TABLE comic_book_order
MODIFY COLUMN customer_id varchar(255) NOT NULL;
--rollback MODIFY COLUMN customer_id varchar(36) NOT NULL; ALTER TABLE comic_book_order ADD CONSTRAINT fk_customer_id_comic_book_order FOREIGN KEY (customer_id) REFERENCES customer(customer_id);

--changeset NathanTrowers:2 labels:customer-id,customer-table context:table-column-adjustment
ALTER TABLE customer
MODIFY COLUMN customer_id varchar(255) NOT NULL;
--rollback ALTER TABLE customer MODIFY COLUMN customer_id varchar(36) NOT NULL;

--changeset NathanTrowers:3 labels:customer-id,comic-book-order-table context:table-column-adjustment
ALTER TABLE comic_book_order
ADD CONSTRAINT fk_customer_id_comic_book_order
FOREIGN KEY (customer_id) REFERENCES customer(customer_id);
--rollback DROP FOREIGN KEY fk_customer_id_comic_book_order;

