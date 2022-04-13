.SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: gen

run: init article-migrate seed server

ci-test: init test

init: ## setup docker build, network, and databases
	docker network create monorepo || true
	docker-compose up -d article-mysql
	docker-compose up -d message-bus-redis
	docker-compose run --rm dockerize -wait tcp://article-mysql:3306 -timeout 20s

build:
	docker-compose build

seed: ## insert seed data
	docker-compose run --rm api go run ./cmd/db/seed

server: ## go run server
	docker-compose up -d article-mysql
	docker-compose up -d message-bus-redis
	docker-compose run --rm dockerize -wait tcp://article-mysql:3306 -timeout 20s
	docker-compose up api

test: pkg = ./...
test: ## go test
	docker-compose up -d article-mysql-test
	docker-compose up -d message-bus-redis
	docker-compose run --rm dockerize -wait tcp://article-mysql-test:3306 -timeout 20s
	docker-compose run --rm -e DB_HOST=article-mysql-test article-migrate db:migrate
	docker-compose run --rm test go test -v -cover -coverprofile=coverage.out $(pkg)

article-migrate: ## migrate
	docker-compose run --rm article-migrate

article-command: cmd :=
article-command: ## rake $(cmd) - execute standalone-migration command
	docker-compose run --rm article-migrate $(cmd)

gen: opt :=
gen: ## generate entity from schema
	docker-compose run --rm gen \
	bash -c 'gen --sqltype=$$DB_DRIVER \
	--connstr=$$DSN \
	--database=$$DB_NAME \
	--exclude=ar_internal_metadata,schema_migrations \
	--out $$ENTITY_OUT_DIR/$$DB_NAME/ \
	--model=$$DB_NAME \
	--templateDir=$$ENTITY_TEMP_DIR \
	--mapping=$$ENTITY_TEMP_DIR/mapping.json \
	--exec=$$ENTITY_TEMP_DIR/entity.gen \
	--gorm $(opt) \
	&& sed -i "/commentDeleteFlag/d" $$ENTITY_OUT_DIR/$$DB_NAME/* \
	&& goimports -w $$ENTITY_OUT_DIR/$$DB_NAME/. '

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHOTY: down
down: ## stop docker containers
	dockre-compose down

.PHONY: mysql
mysql: ## connect to local mysql database
	. ./go/.env/server && docker-compose exec article-mysql mysql -u$${ADMIN_MYSQL_ARTICLE_USER} -p$${ADMIN_MYSQL_ARTICLE_PASSWORD} $${ADMIN_MYSQL_ARTICLE_DATABASE}
