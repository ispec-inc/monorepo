.SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: protoc

protoc: # protoc
	rm -rf ./go/proto
	mkdir ./go/proto
	rm -rf ./docs/proto
	mkdir ./docs/proto
	rm -rf ./typescript/libs/proto
	mkdir ./typescript/libs/proto
	docker-compose run --rm protoc \
		-I=./proto \
		-I=/go/src \
		-I=/go/src/github.com/envoyproxy/protoc-gen-validate \
		--go_out=paths=source_relative:./go/proto \
		--validate_out=lang=go,paths=source_relative:./go/proto \
		--plugin=protoc-gen-ts=/ts/node_modules/.bin/protoc-gen-ts \
		--ts_out=./typescript/libs/proto \
		--js_out=import_style=commonjs,binary:./typescript/libs/proto \
		--doc_out=./docs/proto \
		--doc_opt=markdown,index.md \
		$(shell find ./proto -name '*.proto')

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
