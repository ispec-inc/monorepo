package service

import (
	"os"
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/config"
)

func TestMain(m *testing.M) {
	err := rdb.InitTest(rdb.TestConfig{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlJamRollTest.User,
			Password: config.MysqlJamRollTest.Password,
			Host:     config.MysqlJamRollTest.Host,
			Port:     config.MysqlJamRollTest.Port,
			Database: config.MysqlJamRollTest.Database,
		},
	})
	if err != nil {
		os.Exit(1)
	}
	m.Run()
}
