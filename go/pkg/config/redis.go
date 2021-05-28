package config

import (
	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&Redis); err != nil {
		panic(err)
	}
}

var Redis redis

type redis struct {
	Host string `env:"REDIS_HOST"`
	Port string `env:"REDIS_PORT"`
}
