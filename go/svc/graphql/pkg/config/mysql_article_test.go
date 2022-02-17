package config

import "github.com/ispec-inc/monorepo/go/pkg/setting"

func init() {
	s := setting.Get().MysqlArticleTest

	MysqlGraphqlTest = mysqlGraphqlTest{
		User:     s.User,
		Password: s.Password,
		Database: s.Database,
		Host:     s.Host,
		Port:     s.Port,
	}
}

var MysqlGraphqlTest mysqlGraphqlTest

type mysqlGraphqlTest struct {
	User     string
	Password string
	Database string
	Host     string
	Port     string
}
