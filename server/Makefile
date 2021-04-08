SHELL=/bin/bash
.DEFAULT_GOAL := help

.PHONY: setup migrate seed server test generate db help

setup: ## setup docker build, network, and databases
	docker network create monorepo || true
	docker-compose up -d mysql
	docker-compose up -d mysql-test
	docker-compose build
	docker-compose run dockerize -wait tcp://mysql:3306 -timeout 20s
	docker-compose run dockerize -wait tcp://mysql-test:3306 -timeout 20s

migrate: ## migrate
	docker-compose run --rm migrate db:migrate
	docker-compose run --rm -e DB_HOST=mysql-test migrate db:migrate

seed: ## insert seed data
	docker-compose run --rm api go run ./cmd/db/seed

server: ## go run server
	docker-compose up -d mysql
	docker-compose run dockerize -wait tcp://mysql:3306 -timeout 20s
	docker-compose up api

test: pkg = ./...
test: ## go test
	docker-compose run --rm -e DB_HOST=mysql-test api go test -v -cover -coverprofile=coverage.out $(pkg)

generate: pkg = ./...
generate: ## go generate
	docker-compose run --rm api go generate $(pkg)

db: cmd
db: ## rake $(cmd) - execute standalone-migration command
	docker-compose run --rm migrate $(cmd)

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
