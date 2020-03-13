FROM mhart/alpine-node

RUN apk add --no-cache bash
RUN yarn global add serve

WORKDIR /app

COPY build .
