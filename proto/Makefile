SHELL=/bin/bash
.DEFAULT_GOAL := help

.PHONY: protoc

protoc: ## generate go and ruby codes from proto
	protoc -I=./proto --go_out=./go --go_opt=paths=source_relative $(shell find ./proto -name '*.proto')
	grpc_tools_ruby_protoc -I=./proto --ruby_out=./ruby --grpc_out=./ruby $(shell find ./proto -name '*.proto')
	/bin/bash scripts/gen_dummy_rb.sh

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
