# syntax=docker/dockerfile:1

FROM maven:3-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true

FROM eclipse-temurin:17.0.8.1_1-jdk-focal
WORKDIR /app
COPY --from=builder /app/target/shooting-star-0.1.0.jar ./shooting-star.jar
EXPOSE 8092
ENTRYPOINT ["java", "-jar", "shooting-star.jar"]
