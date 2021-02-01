package main

import (
	"fmt"

	"github.com/tanimutomo/sqlfile"

	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

func main() {
	db, err := mysql.Init()
	if err != nil {
		panic(err)
	}
	sqldb, err := db.DB()
	if err != nil {
		panic(err)
	}

	s := sqlfile.New()
	if err := s.File("./cmd/db/init/sql/create_tables.sql"); err != nil {
		panic(err)
	}

	if _, err := s.Exec(sqldb); err != nil {
		panic(err)
	}

	fmt.Println("Migration successfully ended")
}
