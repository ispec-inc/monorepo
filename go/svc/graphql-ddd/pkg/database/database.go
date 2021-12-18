package database

import (
	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/config"
	"gorm.io/gorm"
)

var db *gorm.DB

func Init(indb *gorm.DB) (err error) {
	if indb != nil {
		db = indb
		return nil
	}

	var loglev rdb.LogLevel
	if config.MysqlJamRoll.ShowAllLog {
		loglev = rdb.LogLevelInfo
	} else {
		loglev = rdb.LogLevelError
	}

	db, err = rdb.New(rdb.Config{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlJamRoll.User,
			Password: config.MysqlJamRoll.Password,
			Host:     config.MysqlJamRoll.Host,
			Port:     config.MysqlJamRoll.Port,
			Database: config.MysqlJamRoll.Database,
		},
		LogLevel:    loglev,
		MaxIdleConn: config.MysqlJamRoll.MaxIdleConn,
		MaxOpenConn: config.MysqlJamRoll.MaxOpenConn,
		MaxLifetime: config.MysqlJamRoll.MaxLifetime,
	})
	return err
}

func Get() *gorm.DB {
	return db
}
