package config

import (
	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&Elasticsearch); err != nil {
		panic(err)
	}
}

var Elasticsearch elasticsearch

type elasticsearch struct {
	URLs   []string `env:"SEARCH_ELASTICSEARCH_URLS" envSeparator:","`
	UseAWS bool     `env:"SEARCH_USE_AWS"`
}
