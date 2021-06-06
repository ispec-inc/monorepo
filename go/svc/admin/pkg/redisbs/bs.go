package redisbs

import (
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/pkg/redis"
)

var bs *msgbs.RedisMessageBus

func Init() (err error) {
	rcon, err := redis.New()
	if err != nil {
		return err
	}

	pscon, err := redis.NewPubSub()
	if err != nil {
		return err
	}
	bs = msgbs.NewRedis(pscon, &rcon)

	return nil
}

func Get() *msgbs.RedisMessageBus {
	return bs
}
