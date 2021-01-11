package config

import "github.com/caarlos0/env/v6"

var Sentry sentry

type sentry struct {
	DSN   string `env:"SENTRY_DSN"`
	Env   string
	Debug bool
}

func initSentry(e Env) {
	if err := env.Parse(&Sentry); err != nil {
		panic(err)
	}

	Sentry.Env = e.String()

	switch e {
	case EnvProd:
		Sentry.Debug = false
	default:
		Sentry.Debug = true
	}
}
