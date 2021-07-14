SHELL=/bin/bash
.DEFAULT_GOAL := help

.PHONY: init build seed server test update-proto mockgen mockadd gen help

init: ## setup docker build, network, and databases
	docker network create monorepo || true
	docker-compose up -d article-mysql
	docker-compose up -d article-mysql-test
	docker-compose run dockerize -wait tcp://article-mysql:3306 -timeout 20s
	docker-compose run dockerize -wait tcp://article-mysql-test:3306 -timeout 20s

build:
	docker-compose build

seed: ## insert seed data
	docker-compose run --rm article-api go run ./cmd/db/seed

server: ## go run server
	docker-compose up -d article-mysql
	docker-compose run dockerize -wait tcp://article-mysql:3306 -timeout 20s
	docker-compose up article-api admin-api

test: pkg = ./...
test: ## go test
	docker-compose run --rm test go test -v -cover -coverprofile=coverage.out $(pkg)

mockgen: cmd = mockgen
mockgen: ## generate mock by gomockhandler (cmd is gomockhandler command)
	gomockhandler -config=./gomockhandler.json $(cmd)

mockadd: ## add a new mock generate
	gomockhandler -config=./gomockhandler.json -source $(source) -destination $(destination)

gen: ## generate entity from schema
	docker-compose run --rm gen \
	bash -c 'export $(cat gen/.env | grep -v ^#) \
	&& gen --sqltype=$$DB_DRIVER \
	--connstr=$$DSN \
	--database=$$DB_NAME \
	--exclude=ar_internal_metadata,schema_migrations \
	--out $$OUT_DIR/$$DB_NAME/ \
	--model=$$DB_NAME \
	--templateDir=$$TEMP_DIR \
	--mapping=$$TEMP_DIR/mapping.json \
	--exec=$$TEMP_DIR/entity.gen \
	--gorm \
	&& sed -i "/commentDeleteFlag/d" $$OUT_DIR/$$DB_NAME/* \
	&& goimports -w $$OUT_DIR/$$DB_NAME/. '

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
