package config

import (
	"github.com/davecgh/go-spew/spew"
	"github.com/ispec-inc/monorepo/go/pkg/setting"
)

func init() {
	s := setting.Get().RedisMsgbs

	RedisMsgbs = redis{
		Host: s.Host,
		Port: s.Port,
	}

	spew.Dump(RedisMsgbs)
}

var RedisMsgbs redis

type redis struct {
	Host string
	Port string
}
