package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

func main() {
	repo, repoCleanup, err := registry.NewRepository()
	if err != nil {
		panic(err)
	}
	defer repoCleanup()

	srvc, srvcCleanup, err := registry.NewService()
	if err != nil {
		panic(err)
	}
	defer srvcCleanup()

	r := NewRouter(repo, srvc)
	http.ListenAndServe(":9000", r)
}
