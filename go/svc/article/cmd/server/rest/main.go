package main

import (
	"fmt"
	"net/http"

	"github.com/ispec-inc/monorepo/go/pkg/config"
	"github.com/ispec-inc/monorepo/go/svc/article/pkg/registry"
)

func main() {
	repo, repoCleanup, err := registry.NewRepository()
	if err != nil {
		panic(err)
	}
	defer repoCleanup()

	lgr, lgrCleanup, err := registry.NewLogger()
	if err != nil {
		panic(err)
	}
	defer lgrCleanup()

	rgst := registry.NewRegistry(repo, lgr)

	r := NewRouter(rgst)
	port := fmt.Sprintf(":%d", config.Router.Port)
	http.ListenAndServe(port, r)
}
