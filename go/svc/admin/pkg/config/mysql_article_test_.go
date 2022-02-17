package config

import "github.com/ispec-inc/monorepo/go/pkg/setting"

func init() {
	s := setting.Get().MysqlArticleTest

	MysqlAdminTest = mysqlAdminTest{
		User:     s.User,
		Password: s.Password,
		Database: s.Database,
		Host:     s.Host,
		Port:     s.Port,
	}
}

var MysqlAdminTest mysqlAdminTest

type mysqlAdminTest struct {
	User     string
	Password string
	Database string
	Host     string
	Port     string
}
