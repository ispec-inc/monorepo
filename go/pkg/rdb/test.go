package rdb

import (
	txdb "github.com/DATA-DOG/go-txdb"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

const Driver = "txdb"

func InitTest(c TestConfig) error {
	dsn, err := dsn(c.DBMS, c.Conn)
	if err != nil {
		return err
	}
	txdb.Register(Driver, "mysql", dsn)
	return nil
}

func NewTest(name string) (*gorm.DB, error) {
	dialector := mysql.New(mysql.Config{
		DriverName: Driver,
		DSN:        name,
	})
	return gorm.Open(dialector, &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
}
