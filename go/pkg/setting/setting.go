package setting

import (
	"bytes"
	"os"
	"path"
	"text/template"

	"github.com/Masterminds/sprig"
	"github.com/davecgh/go-spew/spew"
	"gopkg.in/yaml.v2"
)

const (
	settingDir       = "setting"
	prodSettingFile  = "setting.prod.yaml"
	localSettingFile = "setting.local.yaml"
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
	Setting setting
)

func init() {
	var f string
	if os.Getenv("ENV") == "local" {
		f = localSettingFile
	} else {
		f = prodSettingFile
	}
	t, err := template.New(f).Funcs(
		sprig.TxtFuncMap(),
	).ParseFiles(path.Join(settingDir, f))

	if err != nil {
		panic(err)
	}

	var b bytes.Buffer
	if err := t.Execute(&b, nil); err != nil {
		panic(err)
	}

	spew.Dump(b)

	if err = yaml.Unmarshal(b.Bytes(), &Setting); err != nil {
		panic(err)
	}
}

func Get() setting {
	return Setting
}
