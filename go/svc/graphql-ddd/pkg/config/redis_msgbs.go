package config

import (
	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&RedisMsgbs); err != nil {
		panic(err)
	}
}

var RedisMsgbs redis

type redis struct {
	Host string `env:"JAM_ROLL_REDIS_MSGBS_HOST"`
	Port string `env:"JAM_ROLL_REDIS_MSGBS_PORT"`
}
