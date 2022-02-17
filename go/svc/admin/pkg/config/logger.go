package config

import (
	"github.com/ispec-inc/monorepo/go/pkg/setting"
)

const (
	LoggerTypeStdlog = LoggerType("stdlog")
	LoggerTypeSentry = LoggerType("sentry")
)

type LoggerType string

func init() {
	typ := setting.Get().Logger.Type
	switch typ {
	case string(LoggerTypeSentry):
		Logger.Type = LoggerTypeSentry
	default:
		Logger.Type = LoggerTypeStdlog
	}
}

var Logger logger

type logger struct {
	Type LoggerType
}
