.PHONY: init
init:
	go mod download
	docker network create monolith

.PHONY: server
server:
	docker-compose up -d mysql
	docker-compose run dockerize
	docker-compose up api

.PHONY: dbinit
dbinit:
	docker-compose up -d mysql
	docker-compose run dockerize
	docker-compose up dbinit

.PHONY: generate
generate:
	go generate ./...