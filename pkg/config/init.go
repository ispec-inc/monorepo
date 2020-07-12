package config

import (
	"os"
	"strconv"
	"time"
)

func Init() {
	timeout, _ := strconv.Atoi(os.Getenv("APP_TIMEOUT"))
	Router = router{
		Timeout: timeout,
	}

	maxIdle, _ := strconv.Atoi(os.Getenv("DB_MAX_IDLE_CONNS"))
	maxOpen, _ := strconv.Atoi(os.Getenv("DB_MAX_OPENC_CONNS"))
	maxLifetime, _ := strconv.Atoi(os.Getenv("DB_CONN_MAX_LIFETIME"))
	RDS = rds{
		MS:          os.Getenv("DB_TYPE"),
		User:        os.Getenv("DB_USERNAME"),
		Password:    os.Getenv("DB_PASSWORD"),
		Database:    os.Getenv("DB_NAME"),
		Host:        os.Getenv("DB_HOST"),
		Port:        os.Getenv("DB_PORT"),
		MaxIdle:     maxIdle,
		MaxOpen:     maxOpen,
		MaxLifetime: time.Duration(maxLifetime),
	}
}
