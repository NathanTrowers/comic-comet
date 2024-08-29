-- liquibase formatted sql

--changeset NathanTrowers:1 labels:admin-table context:record-adjustment
UPDATE admin
SET password = '$2y$10$FGpq6rdzVEwIbkX9KyanmuFda8qeOaAEHOUs.1SmXRT5C33KdJmMu' -- -p @dM1nistr8tor
WHERE email = 'admin@test.com';
--rollback UPDATE admin SET password = '$2y$10$rnUWc7SqdCm2kncWizt7kefggSAKvNZLKSWnQNhkRleFCovhrQKgW' WHERE email = 'admin@test.com';
