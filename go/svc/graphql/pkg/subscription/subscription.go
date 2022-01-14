package subscription

import (
	"github.com/gomodule/redigo/redis"
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/redisbs"
)

func Subscribe(
	evnt msgbs.Event,
	handler func(msg redis.Message),
) {
	bs := redisbs.Get()
	bs.Subscribe(evnt)
	go func() {
		for {
			switch msg := bs.Receive().(type) {
			case redis.Message:
				handler(msg)
			}
		}
	}()
}
