FROM alpine:latest

RUN apk update

RUN apk add nodejs-current
RUN apk add npm
RUN apk add gcc
RUN apk add docker
RUN apk add python3
RUN apk add openjdk11
RUN apk add go
RUN apk add curl

COPY . /app
WORKDIR /app
RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 5000







