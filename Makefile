.PHONY: setup server generate

setup:
	docker network create monolith || true
	docker-compose up -d mysql
	docker-compose build
	docker-compose run dockerize
	docker-compose up dbinit

server:
	docker-compose up -d mysql
	docker-compose run dockerize
	docker-compose up api

generate:
	go generate ./...
