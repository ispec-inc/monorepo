package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

func main() {
	if err := mysql.SetDB(); err != nil {
		panic(err)
	}

	r := SetRouter()
	http.ListenAndServe(":9000", r)
}
