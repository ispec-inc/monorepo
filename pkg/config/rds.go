package config

import (
	"time"

	"github.com/caarlos0/env/v6"
)

var RDS rds

type rds struct {
	Driver      string        `env:"DB_DRIVER"`
	User        string        `env:"DB_USERNAME"`
	Password    string        `env:"DB_PASSWORD"`
	Database    string        `env:"DB_NAME"`
	Host        string        `env:"DB_HOST"`
	Port        string        `env:"DB_PORT"`
	MaxIdle     int           `env:"DB_MAX_IDLE_CONNS"`
	MaxOpen     int           `env:"DB_MAX_OPEN_CONNS"`
	MaxLifetime time.Duration `env:"DB_MAX_CONN_LIFETIME"`
}

func initRDS() {
	if err := env.Parse(&RDS); err != nil {
		panic(err)
	}
}
