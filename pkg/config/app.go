package config

import (
	"os"
	"strconv"
)

type Router struct {
	Timeout int
}

func NewRouter() Router {
	Timeout, _ := strconv.Atoi(os.Getenv("APP_TIMEOUT"))
	return Router{
		Timeout: Timeout,
	}
}
