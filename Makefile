.PHONY: setup server generate test

setup:
	docker network create monolith || true
	docker-compose up -d mysql
	docker-compose build
	docker-compose run dockerize
	docker-compose run --rm -T app go run ./cmd/db/init

server:
	docker-compose up -d mysql
	docker-compose run dockerize
	docker-compose up app

generate:
	go generate ./...

test: pkg = ./...
test:
	docker-compose run --rm -T app go test -v -cover -coverprofile=coverage.out $(pkg)
