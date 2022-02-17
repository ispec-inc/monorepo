package config

import (
	"time"

	"github.com/ispec-inc/monorepo/go/pkg/setting"
)

func init() {
	s := setting.Get().MysqlArticle

	MysqlAdmin = mysqlAdmin{
		User:        s.User,
		Password:    s.Password,
		Database:    s.Database,
		Host:        s.Host,
		Port:        s.Port,
		ShowAllLog:  s.ShowAllLog,
		MaxIdleConn: s.MaxIdleConn,
		MaxOpenConn: s.MaxOpenConn,
		MaxLifetime: s.MaxLifetime,
	}
}

var MysqlAdmin mysqlAdmin

type mysqlAdmin struct {
	User        string
	Password    string
	Database    string
	Host        string
	Port        string
	ShowAllLog  bool
	MaxIdleConn int
	MaxOpenConn int
	MaxLifetime time.Duration
}
