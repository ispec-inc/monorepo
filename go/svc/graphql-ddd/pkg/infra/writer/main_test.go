package writer_test

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
			User:     config.MysqlArticleTest.User,
			Password: config.MysqlArticleTest.Password,
			Host:     config.MysqlArticleTest.Host,
			Port:     config.MysqlArticleTest.Port,
			Database: config.MysqlArticleTest.Database,
		},
	})
	if err != nil {
		os.Exit(1)
	}
	m.Run()
}
