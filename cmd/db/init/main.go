package main

import (
	"fmt"

	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
	"github.com/tanimutomo/sqlfile"
)

func main() {
	db, err := mysql.New()
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
