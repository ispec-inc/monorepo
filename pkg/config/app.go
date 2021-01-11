package config

import (
	"os"

	"github.com/caarlos0/env/v6"
)

var App app

type app struct {
	Env Env
}

func initApp() {
	if err := env.Parse(&App); err != nil {
		panic(err)
	}

	App.Env = newEnv(os.Getenv("APP_ENVIRONMENT"))
}
