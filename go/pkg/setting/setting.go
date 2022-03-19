package main

const (
	settingDir       = "setting"
	prodSettingFile  = settingDir + "/setting.prod.yaml"
	localSettingFile = settingDir + "/setting.local.yaml"
)

type (
	setting struct {
		MysqlArticle          MysqlArticle          `yaml:"mysql_jam_roll"`
		MysqlArticleTest      MysqlArticleTest      `yaml:"mysql_jam_roll_test"`
		RedisMsgbs            RedisMsgbs            `yaml:"redis_msgbs"`
		Sentry                Sentry                `yaml:"sentry"`
		ElasticsearchMatching ElasticsearchMatching `yaml:"elasticsearch_matching"`
		Router                Router                `yaml:"router"`
		Logger                Logger                `yaml:"logger"`
		AuthN                 AuthN                 `yaml:"authn"`
	}
)

var (
	Setting     setting
	settingFile string
)
