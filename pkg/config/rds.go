package config

import (
	"time"
)

var RDS rds

type rds struct {
	MS          string
	User        string
	Password    string
	Database    string
	Host        string
	Port        string
	MaxIdle     int
	MaxOpen     int
	MaxLifetime time.Duration
}
