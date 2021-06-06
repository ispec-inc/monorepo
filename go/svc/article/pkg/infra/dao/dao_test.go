package dao

import (
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/mysql"
	"github.com/ispec-inc/monorepo/go/svc/article/pkg/config"
)

func TestMain(m *testing.M) {
	mysql.InitTest(mysql.TestConfig{
		User:     config.MysqlArticleTest.User,
		Password: config.MysqlArticleTest.Password,
		Host:     config.MysqlArticleTest.Host,
		Port:     config.MysqlArticleTest.Port,
		Database: config.MysqlArticleTest.Database,
	})
}
