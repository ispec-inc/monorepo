package config

import (
	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&MysqlArticleTest); err != nil {
		panic(err)
	}
}

var MysqlArticleTest mysqlArticleTest

type mysqlArticleTest struct {
	User     string `env:"ARTICLE_MYSQL_ARTICLE_TEST_USERNAME"`
	Password string `env:"ARTICLE_MYSQL_ARTICLE_TEST_PASSWORD"`
	Database string `env:"ARTICLE_MYSQL_ARTICLE_TEST_NAME"`
	Host     string `env:"ARTICLE_MYSQL_ARTICLE_TEST_HOST"`
	Port     string `env:"ARTICLE_MYSQL_ARTICLE_TEST_PORT"`
}
