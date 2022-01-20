package config

import (
	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&MysqlAuthnTest); err != nil {
		panic(err)
	}
}

var MysqlAuthnTest mysqlAuthnTest

type mysqlAuthnTest struct {
	User     string `env:"AUTHN_MYSQL_MEETING_TEST_USER"`
	Password string `env:"AUTHN_MYSQL_MEETING_TEST_PASSWORD"`
	Database string `env:"AUTHN_MYSQL_MEETING_TEST_DATABASE"`
	Host     string `env:"AUTHN_MYSQL_MEETING_TEST_HOST"`
	Port     string `env:"AUTHN_MYSQL_MEETING_TEST_PORT"`
}
