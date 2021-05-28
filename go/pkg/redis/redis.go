package redis

import (
	"fmt"

	"github.com/gomodule/redigo/redis"
	"github.com/ispec-inc/monorepo/go/pkg/config"
)

func New() (redis.Conn, error) {
	addr := fmt.Sprintf("%s:%s", config.Redis.Host, config.Redis.Port)

	conn, err := redis.Dial("tcp", addr)
	if err != nil {
		return nil, err
	}

	return conn, nil
}

func NewPubSub() (*redis.PubSubConn, error) {
	addr := fmt.Sprintf("%s:%s", config.Redis.Host, config.Redis.Port)

	conn, err := redis.Dial("tcp", addr)
	if err != nil {
		return nil, err
	}

	return &redis.PubSubConn{Conn: conn}, nil
}
