.PHONY: setup server generate test

setup:
	docker network create monolith || true
	docker-compose up -d mysql
	docker-compose build
	docker-compose run dockerize
	docker-compose up dbinit

server:
	docker-compose up -d mysql
	docker-compose run dockerize
	docker-compose up app

generate:
	go generate ./...

test: pkg = ./...
test:
	docker-compose run --rm -e -T app go test -v -p 1 -cover  -coverprofile=coverage.out $(pkg)