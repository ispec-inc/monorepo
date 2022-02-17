package config

import "github.com/ispec-inc/monorepo/go/pkg/setting"

func init() {
	s := setting.Get().Sentry

	Sentry = sentry{
		DSN:   s.DSN,
		Env:   s.Environment,
		Debug: s.Debug,
	}
}

var Sentry sentry

type sentry struct {
	DSN   string
	Env   string
	Debug bool
}
