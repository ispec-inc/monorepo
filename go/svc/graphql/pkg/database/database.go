package database

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/config"
)

var db *gorm.DB

func Init(indb *gorm.DB) (err error) {
	if indb != nil {
		db = indb
		return nil
	}

	var loglev rdb.LogLevel
	if config.MysqlGraphql.ShowAllLog {
		loglev = rdb.LogLevelInfo
	} else {
		loglev = rdb.LogLevelError
	}

	db, err = rdb.New(rdb.Config{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlGraphql.User,
			Password: config.MysqlGraphql.Password,
			Host:     config.MysqlGraphql.Host,
			Port:     config.MysqlGraphql.Port,
			Database: config.MysqlGraphql.Database,
		},
		LogLevel:    loglev,
		MaxIdleConn: config.MysqlGraphql.MaxIdleConn,
		MaxOpenConn: config.MysqlGraphql.MaxOpenConn,
		MaxLifetime: config.MysqlGraphql.MaxLifetime,
	})
	return err
}

func Get() *gorm.DB {
	return db
}
