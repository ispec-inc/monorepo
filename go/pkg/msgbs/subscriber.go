package msgbs

import (
	"fmt"
	"log"

	"github.com/gomodule/redigo/redis"
)

type SubscribeFunc func(redis.Message) error

type Subscriber struct {
	MessageBus MessageBus
	Func       map[Event]SubscribeFunc
}

func NewSubscriber(bs MessageBus) Subscriber {
	return Subscriber{
		MessageBus: bs,
		Func:       map[Event]SubscribeFunc{},
	}
}

func (r Subscriber) Mount(router Subscriber) {
	for evnt, subsc := range router.Func {
		r.Func[evnt] = subsc
	}
}

func (r Subscriber) Subscribe(evnt Event, subsc SubscribeFunc) {
	r.Func[evnt] = subsc
}

func (r Subscriber) Serve() {
	for evnt, subsc := range r.Func {
		r.MessageBus.Subscribe(evnt)
		go func(subsc SubscribeFunc) {
			for {
				switch v := r.MessageBus.Receive().(type) {
				case redis.Message:
					err := subsc(v)
					log.Println(err)
				case redis.Subscription:
					fmt.Printf("%s: %s %d\n", v.Channel, v.Kind, v.Count)
				case error:
					log.Println(v)
				}
			}
		}(subsc)
	}
}

func (r Subscriber) Shutdown() {
	for evnt := range r.Func {
		r.MessageBus.Unsubscribe(evnt)
	}
}
