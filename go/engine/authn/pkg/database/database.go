package database

import (
	"github.com/ispec-inc/monorepo/go/engine/authn/config"
	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"gorm.io/gorm"
)

var db *gorm.DB

func Init(indb *gorm.DB) (err error) {
	if indb != nil {
		db = indb
		return nil
	}

	var loglev rdb.LogLevel
	if config.MysqlAuthn.ShowAllLog {
		loglev = rdb.LogLevelInfo
	} else {
		loglev = rdb.LogLevelError
	}

	db, err = rdb.New(rdb.Config{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlAuthn.User,
			Password: config.MysqlAuthn.Password,
			Host:     config.MysqlAuthn.Host,
			Port:     config.MysqlAuthn.Port,
			Database: config.MysqlAuthn.Database,
		},
		LogLevel:    loglev,
		MaxIdleConn: config.MysqlAuthn.MaxIdleConn,
		MaxOpenConn: config.MysqlAuthn.MaxOpenConn,
		MaxLifetime: config.MysqlAuthn.MaxLifetime,
	})
	return err
}

func Get() *gorm.DB {
	return db
}
