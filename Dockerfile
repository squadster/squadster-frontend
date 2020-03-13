FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY build .
