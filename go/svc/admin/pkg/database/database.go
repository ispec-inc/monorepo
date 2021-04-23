package database

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/pkg/mysql"
)

var db *gorm.DB

func Init() (err error) {
	db, err = mysql.New()
	return err
}

func Get() *gorm.DB {
	return db
}
