# dockerfile for java backend


# syntax=docker/dockerfile:1

FROM openjdk:16-alpine3.13


WORKDIR /app


#COPY .mvn/ .mvn
COPY pom.xml ./

RUN ./mvnw dependency:go-offline

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]