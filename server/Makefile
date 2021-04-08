.PHONY: setup migrate server test generate db

setup:
	docker network create monorepo || true
	docker-compose up -d mysql
	docker-compose up -d mysql-test
	docker-compose build
	docker-compose run dockerize -wait tcp://mysql:3306 -timeout 20s
	docker-compose run dockerize -wait tcp://mysql-test:3306 -timeout 20s

migrate:
	docker-compose run --rm migrate db:migrate
	docker-compose run --rm -e DB_HOST=mysql-test migrate db:migrate

server:
	docker-compose up -d mysql
	docker-compose run dockerize -wait tcp://mysql:3306 -timeout 20s
	docker-compose up api

test: pkg = ./...
test:
	docker-compose run --rm -e DB_HOST=mysql-test api go test -v -cover -coverprofile=coverage.out $(pkg)

generate: pkg = ./...
generate:
	docker-compose run --rm api go generate $(pkg)

db: cmd
db:
	docker-compose run --rm migrate $(cmd)
