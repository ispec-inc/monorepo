package main

import (
	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/config"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/seed"
	"gorm.io/gorm"
)

func main() {
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		panic(err)
	}
	defer sqlDB.Close()

	seeds := seed.Dev()
	err = db.Transaction(func(tx *gorm.DB) error {
		for _, s := range seeds {
			if err := tx.Create(s).Error; err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		panic(err)
	}
}

func getDB() (*gorm.DB, error) {
	return rdb.New(rdb.Config{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlArticle.User,
			Password: config.MysqlArticle.Password,
			Host:     config.MysqlArticle.Host,
			Port:     config.MysqlArticle.Port,
			Database: config.MysqlArticle.Database,
		},
		LogLevel:    rdb.LogLevelInfo,
		MaxIdleConn: config.MysqlArticle.MaxIdleConn,
		MaxOpenConn: config.MysqlArticle.MaxOpenConn,
		MaxLifetime: config.MysqlArticle.MaxLifetime,
	})
}
