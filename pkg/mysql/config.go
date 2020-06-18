package mysql

import (
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func NewDB() (*gorm.DB, error) {
	DBMS := os.Getenv("DB_TYPE")
	USER := os.Getenv("DB_USERNAME")
	PASS := os.Getenv("DB_PASSWORD")
	NAME := os.Getenv("DB_NAME")
	HOST := os.Getenv("DB_HOST")
	PORT := os.Getenv("DB_PORT")

	CONNECT := USER + ":" + PASS + "@(" + HOST + ":" + PORT + ")/" + NAME + "?charset=utf8mb4&parseTime=true"

	db, err := gorm.Open(DBMS, CONNECT)
	return db, err
}
