# syntax=docker/dockerfile:1
FROM node:20-alpine

RUN apk add chromium

RUN apk add gettext

WORKDIR /app

ENV CHROME_BIN=/usr/bin/chromium-browser

COPY package*.json ./

COPY . .

EXPOSE 4200

CMD ["sh", "-c", "npm install && npm start"]
