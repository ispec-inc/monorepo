package config

import (
	"time"

	"github.com/ispec-inc/monorepo/go/pkg/setting"
)

func init() {
	s := setting.Get().Rotuer.Article

	Router = router{
		Timeout:      s.Timeout,
		AllowOrigins: s.AllowOrigins,
	}
}

var Router router

type router struct {
	Timeout      time.Duration
	AllowOrigins []string
}
