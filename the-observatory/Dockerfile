# syntax=docker/dockerfile:1
FROM node:18.18.0-alpine

RUN apk add chromium

WORKDIR /app

ENV CHROME_BIN=/usr/bin/chromium-browser

RUN npm install -g @angular/cli

COPY package.json .

RUN npm install

COPY . .

CMD ng serve --host 0.0.0.0
