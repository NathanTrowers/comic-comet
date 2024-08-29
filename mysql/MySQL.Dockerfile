# syntax=docker/dockerfile:1

FROM mysql:9.0

COPY ./ ./docker-entrypoint-initdb.d/
