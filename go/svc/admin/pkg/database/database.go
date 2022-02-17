package database

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/config"
)

var db *gorm.DB

func Init(indb *gorm.DB) (err error) {
	if indb != nil {
		db = indb
		return nil
	}

	var loglev rdb.LogLevel
	if config.MysqlAdmin.ShowAllLog {
		loglev = rdb.LogLevelInfo
	} else {
		loglev = rdb.LogLevelError
	}

	db, err = rdb.New(rdb.Config{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlAdmin.User,
			Password: config.MysqlAdmin.Password,
			Host:     config.MysqlAdmin.Host,
			Port:     config.MysqlAdmin.Port,
			Database: config.MysqlAdmin.Database,
		},
		LogLevel:    loglev,
		MaxIdleConn: config.MysqlAdmin.MaxIdleConn,
		MaxOpenConn: config.MysqlAdmin.MaxOpenConn,
		MaxLifetime: config.MysqlAdmin.MaxLifetime,
	})
	return err
}

func Get() *gorm.DB {
	return db
}
