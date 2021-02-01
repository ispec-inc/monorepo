package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/applog"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

func main() {
	repo, repoCleanup, err := registry.NewRepository()
	if err != nil {
		panic(err)
	}
	defer repoCleanup()

	logCleanup, err := applog.Setup()
	if err != nil {
		panic(err)
	}
	defer logCleanup()

	r := NewRouter(repo)
	http.ListenAndServe(":9000", r)
}
