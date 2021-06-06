package mysql

import (
	"time"

	"gorm.io/gorm/logger"
)

const (
	LogLevelInfo  = LogLevel(logger.Info)
	LogLevelError = LogLevel(logger.Error)
)

type (
	Config struct {
		User        string
		Password    string
		Host        string
		Port        string
		Database    string
		LogLevel    LogLevel
		MaxIdleConn int
		MaxOpenConn int
		MaxLifetime time.Duration
	}

	TestConfig struct {
		User     string
		Password string
		Host     string
		Port     string
		Database string
	}

	LogLevel logger.LogLevel
)
