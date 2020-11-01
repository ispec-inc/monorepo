.PHONY: init
init:
	go mod download
	docker network create monolith

.PHONY: server
server:
	docker-compose up -d mysql
	docker-compose run dockerize
	docker-compose up api
