package config

import (
	"time"

	"github.com/caarlos0/env/v6"
)

var Router router

type router struct {
	Timeout time.Duration `env:"ROUTER_TIMEOUT"`
}

func initRouter() {
	if err := env.Parse(&Router); err != nil {
		panic(err)
	}
}
