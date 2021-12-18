package config

import (
	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&MysqlJamRollTest); err != nil {
		panic(err)
	}
}

var MysqlJamRollTest mysqlArticleTest

type mysqlArticleTest struct {
	User     string `env:"JAM_ROLL_MYSQL_JAM_ROLL_TEST_USER"`
	Password string `env:"JAM_ROLL_MYSQL_JAM_ROLL_TEST_PASSWORD"`
	Database string `env:"JAM_ROLL_MYSQL_JAM_ROLL_TEST_DATABASE"`
	Host     string `env:"JAM_ROLL_MYSQL_JAM_ROLL_TEST_HOST"`
	Port     string `env:"JAM_ROLL_MYSQL_JAM_ROLL_TEST_PORT"`
}
