package mysql

import (
	"fmt"

	txdb "github.com/DATA-DOG/go-txdb"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

const driver = "txdb"

func InitTest(c TestConfig) {
	dsn := fmt.Sprintf(
		"%s:%s@(%s:%s)/%s?charset=utf8mb4&parseTime=true",
		c.User, c.Password, c.Host, c.Port, c.Database,
	)
	txdb.Register(driver, "mysql", dsn)
}

func NewTest(name string) (*gorm.DB, error) {
	dialector := mysql.New(mysql.Config{
		DriverName: driver,
		DSN:        name,
	})
	return gorm.Open(dialector, &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
}
