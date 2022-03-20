package config

import (
	"time"

	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&MysqlArticleTest); err != nil {
		panic(err)
	}
}

var MysqlArticleTest mysqlArticleTest

type mysqlArticleTest struct {
	User        string        `env:"ARTICLE_MYSQL_ARTICLE_TEST_USER"`
	Password    string        `env:"ARTICLE_MYSQL_ARTICLE_TEST_PASSWORD"`
	Database    string        `env:"ARTICLE_MYSQL_ARTICLE_TEST_DATABASE"`
	Host        string        `env:"ARTICLE_MYSQL_ARTICLE_TEST_HOST"`
	Port        string        `env:"ARTICLE_MYSQL_ARTICLE_TEST_PORT"`
	ShowAllLog  bool          `env:"ARTICLE_MYSQL_ARTICLE_TEST_SHOW_ALL_LOG"`
	MaxIdleConn int           `env:"ARTICLE_MYSQL_ARTICLE_TEST_MAX_IDLE_CONN"`
	MaxOpenConn int           `env:"ARTICLE_MYSQL_ARTICLE_TEST_MAX_OPEN_CONN"`
	MaxLifetime time.Duration `env:"ARTICLE_MYSQL_ARTICLE_TEST_MAX_CONN_LIFETIME"`
}
