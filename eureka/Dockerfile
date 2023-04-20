FROM eclipse-temurin:18-alpine

RUN apk update

RUN apk add maven

COPY . /usr/src/myapp
WORKDIR /usr/src/myapp

CMD ["./mvnw", "spring-boot:run"]

EXPOSE 8761

