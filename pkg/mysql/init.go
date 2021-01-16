package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
)

func Init() (*gorm.DB, error) {
	var logLevel logger.LogLevel
	switch config.App.Env {
	case config.EnvDev, config.EnvStg:
		logLevel = logger.Info
	case config.EnvProd:
		logLevel = logger.Error
	}

	conn := fmt.Sprintf(
		"%s:%s@(%s:%s)/%s?charset=utf8mb4&parseTime=true",
		config.RDS.User, config.RDS.Password,
		config.RDS.Host, config.RDS.Port,
		config.RDS.Database,
	)

	db, err := gorm.Open(mysql.Open(conn), &gorm.Config{
		Logger: logger.Default.LogMode(logLevel),
	})
	if err != nil {
		return nil, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}

	sqlDB.SetMaxIdleConns(config.RDS.MaxIdle)
	sqlDB.SetMaxOpenConns(config.RDS.MaxOpen)
	sqlDB.SetConnMaxLifetime(config.RDS.MaxLifetime)

	return db, nil
}
