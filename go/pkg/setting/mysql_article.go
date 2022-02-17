package setting

import "time"

type (
	MysqlArticle struct {
		Host        string        `yaml:"host"`
		User        string        `yaml:"user"`
		Password    string        `yaml:"password"`
		Database    string        `yaml:"database"`
		Port        string        `yaml:"port"`
		ShowAllLog  bool          `yaml:"show_all_log"`
		MaxIdleConn int           `yaml:"max_idle_conn"`
		MaxOpenConn int           `yaml:"max_open_conn"`
		MaxLifetime time.Duration `yaml:"max_lifetime"`
	}

	MysqlArticleTest struct {
		Host     string `yaml:"host"`
		User     string `yaml:"user"`
		Password string `yaml:"password"`
		Database string `yaml:"database"`
		Port     string `yaml:"port"`
	}
)
