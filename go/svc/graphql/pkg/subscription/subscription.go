package subscription

import (
	"log"

	"github.com/davecgh/go-spew/spew"
	"github.com/gomodule/redigo/redis"
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/redisbs"
)

var subscribers = make(map[msgbs.Event]([]chan redis.Message))

func Subscribe(
	evnt msgbs.Event,
	handler func(msg redis.Message),
) {
	bs := redisbs.Get()
	ch := make(chan redis.Message)
	if subscribers[evnt] == nil {
		bs.Subscribe(evnt)
	}
	subscribers[evnt] = append(subscribers[evnt], ch)

	spew.Dump(subscribers)
	log.Printf("subscribing to event: %s", evnt)
	go func() {
		for {
			msg := <-ch
			spew.Dump("subscriber got msg:", msg.Channel)
			handler(msg)
		}
	}()
}

func SubscribeRedis() {
	bs := redisbs.Get()
	go func() {
		for {
			switch msg := bs.Receive().(type) {
			case redis.Message:
				evnt := msgbs.Event(msg.Channel)
				spew.Dump("received redis message", evnt)
				for _, ch := range subscribers[evnt] {
					ch <- msg
				}
			}
		}
	}()
}
