package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

func main() {
	db, err := mysql.NewDB()
	if err != nil {
		panic(err)
	}
	db.Close()

	r := SetRouter()
	http.ListenAndServe(":9000", r)
}
