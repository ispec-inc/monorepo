package main

import (
	"log"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/config"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/seed"
	"gorm.io/gorm"
)

func main() {
	db, err := getDB()
	if err != nil {
		log.Fatal(err)
	}
	var seeds []interface{}

	seeds = append(seeds, seed.PrepareDev()...)
	err = db.Transaction(func(tx *gorm.DB) error {
		for _, s := range seeds {
			if err := tx.Create(s).Error; err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		log.Fatal(err)
	}
}

func getDB() (*gorm.DB, error) {
	return rdb.New(rdb.Config{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlJamRoll.User,
			Password: config.MysqlJamRoll.Password,
			Host:     config.MysqlJamRoll.Host,
			Port:     config.MysqlJamRoll.Port,
			Database: config.MysqlJamRoll.Database,
		},
		LogLevel:    rdb.LogLevelInfo,
		MaxIdleConn: config.MysqlJamRoll.MaxIdleConn,
		MaxOpenConn: config.MysqlJamRoll.MaxOpenConn,
		MaxLifetime: config.MysqlJamRoll.MaxLifetime,
	})
}
