package database

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/pkg/mysql"
)

var db *gorm.DB

func Init(indb *gorm.DB) (err error) {
	if indb != nil {
		db = indb
		return nil
	}
	db, err = mysql.New()
	return err
}

func Get() *gorm.DB {
	return db
}
