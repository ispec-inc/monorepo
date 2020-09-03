.PHONY: init
init:
	docker network create monolith

.PHONY: server
server:
	docker-compose up -d mysql
	docker-compose run dockerize -wait tcp://mysql:3306 -timeout 20s
	docker-compose up api
