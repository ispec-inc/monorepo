package main

import (
	"fmt"
	"net/http"

	"github.com/ispec-inc/monorepo/go/pkg/config"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/database"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/logger"
)

func main() {
	if err := database.Init(); err != nil {
		panic(err)
	}
	cleanup, err := logger.Init()
	if err != nil {
		panic(err)
	}
	cleanup()

	port := fmt.Sprintf(":%d", config.Router.Port)
	http.ListenAndServe(port, NewRouter())
}
