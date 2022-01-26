package subscription

import (
	"fmt"
	"log"

	"context"

	"github.com/gomodule/redigo/redis"
	"github.com/google/uuid"
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/redisbs"
)

var subscribers = make(map[msgbs.Event][]string)
var message = make(map[msgbs.Event]chan redis.Message)

func Subscribe(
	ctx context.Context,
	evnt msgbs.Event,
	handler func(msg redis.Message),
) {
	id := uuid.New().String()
	bs := redisbs.Get()

	bs.Subscribe(evnt)

	if message[evnt] == nil {
		message[evnt] = make(chan redis.Message)
	}

	subscribers[evnt] = append(subscribers[evnt], id)

	go func() {
		defer func() {
			if r := recover(); r != nil {
				err := fmt.Errorf("panic recovered: %v", r)
				log.Printf(err.Error())
			}
		}()
		for {
			select {
			case <-ctx.Done():
				removeSubscriberForEvent(evnt, id)
				return
			case msg := <-message[evnt]:
				handler(msg)
			}
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
				if message[evnt] == nil {
					message[evnt] = make(chan redis.Message)
				}
				ch := message[evnt]
				for range subscribers[evnt] {
					ch <- msg
				}
			}
		}
	}()
}

func removeSubscriberForEvent(evnt msgbs.Event, id string) {
	for i := range subscribers[evnt] {
		if subscribers[evnt][i] == id {
			newSubs := subscribers[evnt][:i]
			if len(newSubs) != len(subscribers[evnt])-1 {
				newSubs = append(newSubs, subscribers[evnt][i+1:]...)
			}
			subscribers[evnt] = newSubs
		}
	}
}
