package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
)

func main() {
	config.LoadEnv("")
	rds := config.NewRDS()
	db, err := dao.NewRDSDB(rds)
	if err != nil {
		panic(err)
	}
	db.Close()

	r := SetRouter()
	http.ListenAndServe(":9000", r)
}
