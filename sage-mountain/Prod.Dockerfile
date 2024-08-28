# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/sage-mountain/ /usr/share/nginx/html
EXPOSE 4200
