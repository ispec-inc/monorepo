package main

import (
	"net/http"

	"github.com/ispec-inc/monorepo/go/pkg/registry"
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
	http.ListenAndServe(":9000", r)
}
