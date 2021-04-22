package database

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/pkg/mysql"
)

var db *gorm.DB

func init() {
	var err error
	db, err = mysql.New()
	if err != nil {
		panic(err)
	}
}

func Get() *gorm.DB {
	return db
}
