.SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: protoc

protoc: # protoc
	rm -rf ./go/gen
	mkdir ./go/gen
	rm -rf ./docs/gen
	mkdir ./docs/gen
	rm -rf ./typescript/gen
	mkdir ./typescript/gen
	docker-compose run --rm protoc \
		-I=./proto \
		-I=/go/src \
		-I=/go/src/github.com/envoyproxy/protoc-gen-validate \
		--go_out=paths=source_relative:./go/gen \
		--validate_out=lang=go,paths=source_relative:./go/gen \
		--plugin=protoc-gen-ts=/ts/node_modules/.bin/protoc-gen-ts \
		--ts_out=./typescript/gen \
		--doc_out=./docs/gen \
		--doc_opt=markdown,index.md \
		$(shell find ./proto -name '*.proto')

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
