package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/DATA-DOG/go-txdb"
	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
)

func NewTest(name string) (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"%s:%s@(%s:%s)/%s?charset=utf8mb4&parseTime=true",
		config.RDS.User, config.RDS.Password,
		config.RDS.Host, config.RDS.Port,
		config.RDS.Database,
	)

	txdb.Register(name, "mysql", dsn)
	dialector := mysql.New(mysql.Config{
		DriverName: name,
		DSN:        dsn,
	})

	return gorm.Open(dialector, &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
}
