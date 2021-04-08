SHELL=/bin/bash
.DEFAULT_GOAL := help

.PHONY: protoc

protoc: ## generate go and ruby codes from proto
	@# go
	protoc \
		-I=./proto \
		-I=${GOPATH}/src \
		-I=${GOPATH}/src/github.com/envoyproxy/protoc-gen-validate \
		--go_out=paths=source_relative:./go \
		--validate_out=lang=go,paths=source_relative:./go \
		$(shell find ./proto -name '*.proto')
	@# ruby
	grpc_tools_ruby_protoc \
		-I=./proto \
		-I=${GOPATH}/src \
		-I=${GOPATH}/src/github.com/envoyproxy/protoc-gen-validate \
		--ruby_out=./ruby \
		$(shell find ./proto -name '*.proto')
	/bin/bash scripts/gen_dummy_rb.sh
	@# typescript
	protoc \
		-I=./proto \
		-I=${GOPATH}/src \
		-I=${GOPATH}/src/github.com/envoyproxy/protoc-gen-validate \
		--plugin=protoc-gen-ts=./ts/node_modules/.bin/protoc-gen-ts \
		--ts_out=paths=source_relative:./ts \
		$(shell find ./proto -name '*.proto')

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
