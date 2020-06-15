package config

import (
	"os"
)

type RDS struct {
	DBMS    string
	CONNECT string
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
