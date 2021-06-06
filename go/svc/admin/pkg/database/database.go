package database

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/pkg/mysql"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/config"
)

var db *gorm.DB

func Init(indb *gorm.DB) (err error) {
	if indb != nil {
		db = indb
		return nil
	}
	db, err = mysql.New(mysql.Config{
		User:        config.MysqlArticle.User,
		Password:    config.MysqlArticle.Password,
		Host:        config.MysqlArticle.Host,
		Port:        config.MysqlArticle.Port,
		Database:    config.MysqlArticle.Database,
		LogLevel:    mysql.LogLevelInfo, // TODO:
		MaxIdleConn: config.MysqlArticle.MaxIdleConn,
		MaxOpenConn: config.MysqlArticle.MaxOpenConn,
		MaxLifetime: config.MysqlArticle.MaxLifetime,
	})
	return err
}

func Get() *gorm.DB {
	return db
}
