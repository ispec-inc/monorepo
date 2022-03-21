## init

> setup docker build, network, and databases

~~~zsh
mask network start
mask mysql article-mysql start
mask mysql article-mysql-test start

# docker-compose up -d article-mysql-test
docker-compose up -d message-bus-redis
docker-compose run --rm dockerize -wait tcp://article-mysql-test:3306 -timeout 20s
~~~

## build

~~~zsh
docker-compose build
~~~

## seed
~~~zsh
  docker-compose run --rm monorepo-api go run ./cmd/db/seed
~~~

## network

### start

~~~zsh
docker network create monorepo || true
~~~

## mysql (name)

### start

~~~zsh
docker-compose up -d $name
docker-compose run --rm dockerize -wait tcp://article-mysql:3306 -timeout 20s
~~~

## redis (name)

## start

~~~zsh
docker-compose up -d $name
~~~
