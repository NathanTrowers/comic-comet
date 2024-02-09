-- liquibase formatted sql

--changeset NathanTrowers:1 labels:admin-table context:table-population
INSERT INTO admin (admin_id, email,	password, name)
VALUES ('a46363a1-7767-4112-8212-ddd647df97f1',  'admin@test.com', '$2y$10$FGpq6rdzVEwIbkX9KyanmuFda8qeOaAEHOUs.1SmXRT5C33KdJmMu', 'Comic Book Sage'); -- -p @dM1nistr8tor
--rollback DELETE FROM admin ;

--changeset NathanTrowers:2 labels:customer-table context:table-population
INSERT INTO customer (customer_id, email, password, name, address, city,  postal_code, country)
VALUES
	('f10bd2fb-a2cb-48bd-bb63-5565c8a3b3c1', 'comicman@test.com', '$2y$10$Q64AO/DW3ulV0rxVoJrtMuEDAH2AT49MkFKm5ExZ28vt5SBNntcm.', 'Comic Man', '10 Superhero Way', 'Sky City', 'M2Z 9P9', 'Canada'), -- -p com1cFanat!c
	('4d4c07a4-974f-491c-b52a-b5709350c1a8', 'comicmanbrother@test.com', '$2y$10$Q64AO/DW3ulV0rxVoJrtMuEDAH2AT49MkFKm5ExZ28vt5SBNntcm.', 'Comic Man\'s Brother', '11 Superhero Way', 'Sky City', 'M2Z 9P9', 'Canada'),
	('1e2ca5cf-0012-4f24-8964-02d9600be250', 'comicwoman@test.com', '$2y$10$Q64AO/DW3ulV0rxVoJrtMuEDAH2AT49MkFKm5ExZ28vt5SBNntcm.', 'Comic Man\'s Wife', '10 Superhero Way', 'Sky City', 'M2Z 9P9', 'Canada');
--rollback DELETE FROM customer;

--changeset NathanTrowers:3 labels:comic-book-table context:table-population
--comment: accepts BLOBs
INSERT INTO comic_book (comic_book_id, name, author, price, quantity, cover_art, carry_status)
VALUES
	('6963a34d-7c0a-42ed-961f-83b31e7c8f33', 'Coiling Dragon', 'I Eat Tomatoes', 108.00, 108, null, 'carrying'),
	('d17f85b9-dc7e-42a4-b917-9cf5f8033fed', 'The Last Christian', 'David Gregory', 50.00, 1, null, 'carrying'),
	('383e7a0f-d3b9-47bf-8fa7-ae8be787f4df', 'Como Agua Para Chocolate', 'Laura Esquivel', 24.00, 2, null, 'carrying'),
	('6969a34d-7c1a-42ed-461f-83e31e7c8f34', 'Coiling Dragon Fandom 1', 'The Fangirls', 108.00, 108, null, 'discontinued');
--rollback DELETE FROM comic_book;

--changeset NathanTrowers:4 labels:order-table context:table-population
INSERT INTO comic_book_order (order_id, customer_id, comic_book_id, order_date)
VALUES ('819d98be-20e8-4dbf-8a0d-2b46fe052de1', 'f10bd2fb-a2cb-48bd-bb63-5565c8a3b3c1', 'd17f85b9-dc7e-42a4-b917-9cf5f8033fed', '2023-08-23 03:14:07'); --- comic man's order of The Last Christian
--rollback DELETE FROM comic_book_order;
