SHELL=/bin/bash
.DEFAULT_GOAL := help

.PHONY: setup seed server test update-proto mockgen mockadd help

setup: ## setup docker build, network, and databases
	docker network create monorepo || true
	docker-compose up -d article-mysql
	docker-compose up -d article-mysql-test
	docker-compose build
	docker-compose run dockerize -wait tcp://article-mysql:3306 -timeout 20s
	docker-compose run dockerize -wait tcp://article-mysql-test:3306 -timeout 20s

seed: ## insert seed data
	docker-compose run --rm article-api go run ./services/article/cmd/db/seed

server: ## go run server
	docker-compose up -d article-mysql
	docker-compose run dockerize -wait tcp://article-mysql:3306 -timeout 20s
	docker-compose up article-api

test: pkg = ./...
test: ## go test
	docker-compose run --rm -e DB_HOST=article-mysql-test article-api go test -v -cover -coverprofile=coverage.out $(pkg)

update-proto: ## update ispec-inc/monorepo/proto version
	docker-compose run --rm article-api go get github.com/ispec-inc/monorepo/proto/go/monorepopb/server/view@$(ver)

mockgen: cmd = mockgen
mockgen: ## generate mock by gomockhandler (cmd is gomockhandler command)
	gomockhandler -config=./gomockhandler.json $(cmd)

mockadd: ## add a new mock generate
	gomockhandler -config=./gomockhandler.json -source $(source) -destination $(destination)

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
