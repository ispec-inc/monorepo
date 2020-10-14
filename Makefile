BUILD_CMD_DIR:=./build_cmd
BUILD_CMD_PKGS:=$(shell go list -f '{{join .Imports "\n"}}' -tags=tools ./tools)
BUILD_CMDS:=$(addprefix $(BUILD_CMD_DIR)/,$(notdir $(BUILD_CMD_PKGS)))

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
