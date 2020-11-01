package config

var Router router

type router struct {
	Timeout int `env:"APP_TIMEOUT"`
}
