# syntax=docker/dockerfile:1

FROM maven:3-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true

FROM eclipse-temurin:17.0.8.1_1-jdk-focal
WORKDIR /app
COPY --from=builder /app/target/sage-cave-0.1.0.jar ./sage-cave.jar
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "sage-cave.jar"]
