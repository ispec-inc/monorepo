package config

import (
	"time"

	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&MysqlAuthn); err != nil {
		panic(err)
	}
}

var MysqlAuthn mysqlAuthn

type mysqlAuthn struct {
	User        string        `env:"AUTHN_MYSQL_MEETING_USER"`
	Password    string        `env:"AUTHN_MYSQL_MEETING_PASSWORD"`
	Database    string        `env:"AUTHN_MYSQL_MEETING_DATABASE"`
	Host        string        `env:"AUTHN_MYSQL_MEETING_HOST"`
	Port        string        `env:"AUTHN_MYSQL_MEETING_PORT"`
	ShowAllLog  bool          `env:"AUTHN_MYSQL_MEETING_SHOW_ALL_LOG" envDefault:"true"`
	MaxIdleConn int           `env:"AUTHN_MYSQL_MEETING_MAX_IDLE_CONN" envDefault:"25"`
	MaxOpenConn int           `env:"AUTHN_MYSQL_MEETING_MAX_OPEN_CONN" envDefault:"25"`
	MaxLifetime time.Duration `env:"AUTHN_MYSQL_MEETING_MAX_CONN_LIFETIME" envDefault:"25s"`
}
