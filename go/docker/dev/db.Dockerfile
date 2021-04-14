FROM ruby:2.7.3-alpine

RUN mkdir /db
COPY ./db db
WORKDIR /db

RUN apk add --no-cache build-base=0.5-r2 mariadb-dev=10.5.8-r0 && \
    gem install bundler:2.2.13 && \
    bundle install

ENTRYPOINT ["rake"]