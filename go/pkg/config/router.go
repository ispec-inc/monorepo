package config

import (
	"time"

	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&Router); err != nil {
		panic(err)
	}
}

var Router router

type router struct {
	Timeout time.Duration `env:"ROUTER_TIMEOUT"`
	Port    int           `env:"ROUTER_PORT"`
}
