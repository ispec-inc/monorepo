package config

import (
	"time"

	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&MysqlJamRoll); err != nil {
		panic(err)
	}
}

var MysqlJamRoll mysqlJamRoll

type mysqlJamRoll struct {
	User        string        `env:"JAM_ROLL_MYSQL_JAM_ROLL_USER"`
	Password    string        `env:"JAM_ROLL_MYSQL_JAM_ROLL_PASSWORD"`
	Database    string        `env:"JAM_ROLL_MYSQL_JAM_ROLL_DATABASE"`
	Host        string        `env:"JAM_ROLL_MYSQL_JAM_ROLL_HOST"`
	Port        string        `env:"JAM_ROLL_MYSQL_JAM_ROLL_PORT"`
	ShowAllLog  bool          `env:"JAM_ROLL_MYSQL_JAM_ROLL_SHOW_ALL_LOG"`
	MaxIdleConn int           `env:"JAM_ROLL_MYSQL_JAM_ROLL_MAX_IDLE_CONN"`
	MaxOpenConn int           `env:"JAM_ROLL_MYSQL_JAM_ROLL_MAX_OPEN_CONN"`
	MaxLifetime time.Duration `env:"JAM_ROLL_MYSQL_JAM_ROLL_MAX_CONN_LIFETIME"`
}
