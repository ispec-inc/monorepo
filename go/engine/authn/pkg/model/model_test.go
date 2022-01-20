package model

import (
	"os"
	"testing"

	"github.com/ispec-inc/monorepo/go/engine/authn/config"
	"github.com/ispec-inc/monorepo/go/pkg/rdb"
)

func TestMain(m *testing.M) {
	err := rdb.InitTest(rdb.TestConfig{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlAuthnTest.User,
			Password: config.MysqlAuthnTest.Password,
			Host:     config.MysqlAuthnTest.Host,
			Port:     config.MysqlAuthnTest.Port,
			Database: config.MysqlAuthnTest.Database,
		},
	})
	if err != nil {
		os.Exit(1)
	}
	m.Run()
}
