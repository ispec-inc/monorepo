package config

import (
	"time"
)

var Router router

type router struct {
	Timeout time.Duration `env:"APP_TIMEOUT"`
}
