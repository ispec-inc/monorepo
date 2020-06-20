package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

func main() {
	if err := mysql.SetDB(); err != nil {
		panic(err)
	}
	db := mysql.GetConnection()
	defer db.Close()

	r := SetRouter()
	http.ListenAndServe(":9000", r)
}
