package dao

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
)

func ConnectDB() (*gorm.DB, error) {
	rds := config.NewRDS()
	db, err := gorm.Open(rds.DBMS, rds.CONNECT)
	return db, err
}
