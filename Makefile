.SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: protoc gen protogen

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

gen: opt :=
gen: ## generate entity from schema
	docker-compose run --rm gen \
	bash -c 'export $(cat gen/.env | grep -v ^#) \
	&& gen --sqltype=$$DB_DRIVER \
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

protogen: opt :=
protogen: ## generate proto file from schema
	docker-compose run --rm gen \
	bash -c 'export $(cat gen/.env | grep -v ^#) \
	&& gen --sqltype=$$DB_DRIVER \
	--connstr=$$DSN \
	--database=$$DB_NAME \
	--exclude=ar_internal_metadata,schema_migrations \
	--out $$PROTO_OUT_DIR/$$DB_NAME/view/ \
	--templateDir=$$PROTO_TEMP_DIR \
	--mapping=$$PROTO_TEMP_DIR/mapping.json \
	--exec=$$PROTO_TEMP_DIR/proto.gen \
	--protobuf $(opt) && \
	find $$PROTO_OUT_DIR/$$DB_NAME/view/ -name "*.proto" | xargs clang-format -i '

help: ## display this help screen
		@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
