package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

func main() {
	db := registry.NewRDSDB()
	defer db.Close()

	r := SetRouter()

	http.ListenAndServe(":9000", r)
}
