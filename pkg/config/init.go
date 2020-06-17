package config

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

func LoadEnv(envFile string) error {
	if envFile == "" {
		err := godotenv.Load()
		return err
	}
	err := godotenv.Load(envFile)
	return err
}

func NewRDS() RDS {
	DBMS := os.Getenv("DB_TYPE")
	USER := os.Getenv("DB_USERNAME")
	PASS := os.Getenv("DB_PASSWORD")
	NAME := os.Getenv("DB_NAME")
	HOST := os.Getenv("DB_HOST")
	PORT := os.Getenv("DB_PORT")

	CONNECT := USER + ":" + PASS + "@(" + HOST + ":" + PORT + ")/" + NAME + "?charset=utf8mb4&parseTime=true"

	return RDS{
		DBMS:    DBMS,
		CONNECT: CONNECT,
	}
}

func NewRouter() Router {
	Timeout, _ := strconv.Atoi(os.Getenv("APP_TIMEOUT"))
	return Router{
		Timeout: Timeout,
	}
}
