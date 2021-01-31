//go:generate go run github.com/golang/mock/mockgen -source=logger.go -destination=mock/logger.go
//go:generate go run github.com/ispec-inc/civgen-go/mockio -source=logger.go -destination=mockio/logger.go

package logger

import (
	"errors"
)

var logger Logger

type Logger interface {
	Error(user User, err Error)
}

func Setup(options Options) (func(), error) {
	var instance Logger
	var cleanup func()
	var err error

	switch options.Type {
	case LogTypeStdout:
		instance = newStdoutLogger()
	case LogTypeSentry:
		instance, cleanup, err = newSentryLogger(options.SentryOptions)
	default:
		err = errors.New("Unknown LogType")
	}

	logger = instance
	return cleanup, err
}

// New should be called after Set has already been called.
func New() Logger {
	return logger
}

type Options struct {
	Type          LogType
	SentryOptions SentryOptions
}

const (
	LogTypeSentry = LogType("sentry")
	LogTypeStdout = LogType("stdout")
)

type LogType string

type SentryOptions struct {
	Environment string
	DSN         string
	Debug       bool
}
