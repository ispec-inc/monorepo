SHELL=/bin/bash
.DEFAULT_GOAL := help

.PHONY: migrate db help

migrate: ## migrate
	docker-compose run --rm migrate db:migrate
	docker-compose run --rm -e DB_HOST=mysql-test migrate db:migrate

db: cmd
db: ## rake $(cmd) - execute standalone-migration command
	docker-compose run --rm migrate $(cmd)

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
