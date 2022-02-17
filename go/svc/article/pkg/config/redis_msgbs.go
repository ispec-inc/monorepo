package config

import "github.com/ispec-inc/monorepo/go/pkg/setting"

func init() {
	s := setting.Get().RedisMsgbs

	RedisMsgbs = redis{
		Host:       s.Host,
		RedisMsgbs: s.Port,
	}
}

var RedisMsgbs redis

type redis struct {
	Host string
	Port string
}
