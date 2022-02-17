package setting

import (
	"bytes"
	"os"
	"text/template"

	"github.com/Masterminds/sprig"
	"gopkg.in/yaml.v2"
)

const (
	settingDir       = "setting"
	prodSettingFile  = settingDir + "/setting.prod.yaml"
	localSettingFile = settingDir + "/setting.local.yaml"
)

type (
	setting struct {
		MysqlArticle     MysqlArticle     `yaml:"mysql_article"`
		MysqlArticleTest MysqlArticleTest `yaml:"mysql_article_test"`
		RedisMsgbs       RedisMsgbs       `yaml:"redis_msgbs"`
		Sentry           Sentry           `yaml:"sentry"`
		Router           Router           `yaml:"router"`
		Logger           Logger           `yaml:"logger"`
		MediaAWS         MediaAWS         `yaml:"media_aws"`
	}
)

var (
	Setting     setting
	settingFile string
)

func init() {
	if os.Getenv("ENV") == "local" {
		settingFile = localSettingFile
	} else {
		settingFile = prodSettingFile
	}

	t, err := template.New(f).Funcs(
		sprig.TxtFuncMap(),
	).ParseFiles(f)

	if err != nil {
		panic(err)
	}

	var b bytes.Buffer
	if err := t.Execute(&b, nil); err != nil {
		panic(err)
	}

	if err = yaml.Unmarshal(b.Bytes(), &Setting); err != nil {
		panic(err)
	}
}

func Get() setting {
	return Setting
}
