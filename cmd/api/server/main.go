package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

func main() {
	config.Init()

	repo, cleanup := registry.NewRepository()
	defer cleanup()

	r := NewRouter(repo)
	http.ListenAndServe(":9000", r)
}
