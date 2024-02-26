-- liquibase formatted sql

--changeset NathanTrowers:1 labels:admin-table context:table-creation
CREATE TABLE admin (
	admin_id 	varchar(36) PRIMARY KEY,
	email 		varchar(50) NOT NULL UNIQUE,
	password 	varchar(255) NOT NULL,
	name 		varchar(50) NOT NULL
);
--rollback DROP TABLE admin;

--changeset NathanTrowers:2 labels:customer-table context:table-creation
CREATE TABLE customer (
	customer_id 		varchar(255)	PRIMARY KEY,
	email 				varchar(50) 	NOT NULL UNIQUE,
	password 			varchar(255) 	NOT NULL,
	name 				varchar(50) 	NOT NULL,
	address				varchar(255) 	NOT NULL,
	city				varchar(255) 	NOT NULL,
	postal_code			varchar(7) 		NOT NULL,
	country				varchar(150) 	NOT NULL
);
--rollback DROP TABLE customer;

--changeset NathanTrowers:3 labels:comic-book-table context:table-creation
--comment: accepts BLOBs
CREATE TABLE comic_book (
	comic_book_id 	varchar(36) 	PRIMARY KEY,
	name 			varchar(100) 	NOT NULL,
	author 			varchar(100) 	NOT NULL,
	price 			float(24)		NOT NULL,
	quantity 		integer(10) 	NOT NULL,
	cover_art		varbinary(45400),
	carry_status	varchar(36) DEFAULT 'carrying'
);
--rollback DROP TABLE comic_book;

--changeset NathanTrowers:4 labels:order-table context:table-creation
CREATE TABLE comic_book_order (
	order_id 		varchar(36) NOT NULL,
	customer_id 	varchar(255) NOT NULL,
	comic_book_id 	varchar(36) NOT NULL,
	order_date  	timestamp 	DEFAULT CURRENT_TIMESTAMP,
	return_status	varchar(36) DEFAULT 'none',
	PRIMARY KEY(order_id, comic_book_id),
	FOREIGN KEY(customer_id) REFERENCES customer(customer_id),
	FOREIGN KEY(comic_book_id) REFERENCES comic_book(comic_book_id) ON DELETE RESTRICT
);
--rollback DROP TABLE order;


--changeset NathanTrowers:5 labels:admin-table context:table-indexing
CREATE INDEX idx_login
ON admin (email, password);
--rollback DROP INDEX idx_login ON admin;

--changeset NathanTrowers:6 labels:customer-table context:table-indexing
CREATE INDEX idx_login
ON customer (email, password);
--rollback DROP INDEX idx_login ON customer;

--changeset NathanTrowers:7 labels:comic-book-table context:table-indexing
CREATE INDEX  idx_name
ON comic_book (name);
--rollback DROP INDEX idx_name ON comic_book;
