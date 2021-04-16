package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/DATA-DOG/go-txdb"
	"github.com/ispec-inc/monorepo/go/pkg/config"
)

const driver = "txdb"

func init() {
	dsn := fmt.Sprintf(
		"%s:%s@(%s:%s)/%s?charset=utf8mb4&parseTime=true",
		config.RDS.User, config.RDS.Password,
		config.RDS.Host, config.RDS.Port,
		config.RDS.Database,
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
