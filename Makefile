BUILD_CMD_DIR:=./build_cmd
BUILD_CMD_PKGS:=$(shell go list -f '{{join .Imports "\n"}}' -tags=tools ./tools)
BUILD_CMDS:=$(addprefix $(BUILD_CMD_DIR)/,$(notdir $(BUILD_CMD_PKGS)))
SOURCE_FILES:=${shell go list -f '{{range .GoFiles}}{{printf "%s/%s\n" (index $$.Dir) .}}{{end}}' ./...}
TEST_FILES:=${shell go list -f '{{range .TestGoFiles}}{{printf "%s/%s\n" (index $$.Dir) .}}{{end}}' ./...}
LINT_PKGS:=${shell go list ./...}
STAMP_DIR:=.stamp
COVER_DIR:=.cover

.PHONY: init
init:
	docker network create monolith

.PHONY: server
server:
	docker-compose up -d mysql
	docker-compose run dockerize -wait tcp://mysql:3306 -timeout 20s
	docker-compose up api

.PHONY: add-tool
add-tool:
ifdef TOOL
	go get $(TOOL)
	@echo 'import _ "$(TOOL)"' | sed 's/@.*"/"/'>> tools/tools.go
endif

.PHONY: tools
tools: $(BUILD_CMDS)
$(BUILD_CMDS): tools/tools.go go.sum go.mod
	go build -o $@ $(filter %/$(notdir $@),$(BUILD_CMD_PKGS))

## Linter に掛ける
.PHONY: lint
lint: $(STAMP_DIR)/govet $(STAMP_DIR)/golint
$(STAMP_DIR)/govet: $(SOURCE_FILES) $(TEST_FILES) | $(STAMP_DIR)
	@go vet -tags=testing $(LINT_PKGS)
	@touch $@
$(STAMP_DIR)/golint: $(BUILD_CMD_DIR)/golint $(SOURCE_FILES) $(TEST_FILES) | $(STAMP_DIR)
	@$< -min_confidence=0.8 -set_exit_status $(LINT_PKGS)
	@touch $@

## Formatter に掛ける
.PHONY: format
format: $(STAMP_DIR)/goimports
$(STAMP_DIR)/goimports:: $(BUILD_CMD_DIR)/goimports | $(STAMP_DIR)
	$< -l -w ./
	@touch $@
$(STAMP_DIR)/goimports:: $(SOURCE_FILES) $(TEST_FILES) | $(STAMP_DIR)
	@$(BUILD_CMD_DIR)/goimports -l -w $?
	@touch $@
$(STAMP_DIR):
	@mkdir -p $@

## test を実行する(+coverageを計測する)
.PHONY: test
test: $(COVER_DIR) $(COVER_DIR)/all.txt
$(COVER_DIR):
	@mkdir $@
$(COVER_DIR)/all.txt: $(SOURCE_FILES) $(TEST_FILES) | $(COVER_DIR)
	@docker-compose up api-test

## 計測した coverage を確認する
.PHONY: coverage
coverage: $(COVER_DIR)/all.txt
	@go tool cover -html=$<

.PHONY: clean
clean:
	@rm -rfv $(BUILD_CMD_DIR)
	@rm -rfv $(STAMP_DIR)
	@rm -rfv $(COVER_DIR)
