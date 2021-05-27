package msgbs

import (
	"context"
	"fmt"

	"github.com/gomodule/redigo/redis"
	"github.com/ispec-inc/monorepo/go/pkg/applog"
)

type SubscribeFunc func(redis.Message) error

type Subscriber struct {
	MessageBus MessageBus
	Func       map[Event]SubscribeFunc
	AppLog     applog.AppLog
}

type FuncRouter map[Event]SubscribeFunc

func NewRouter() FuncRouter {
	return FuncRouter{}
}

func (fr FuncRouter) Subscribe(evnt Event, subsc SubscribeFunc) {
	fr[evnt] = subsc
}

func NewSubscriber(msgbs MessageBus, algr applog.AppLog) Subscriber {
	return Subscriber{
		MessageBus: msgbs,
		AppLog:     algr,
		Func:       map[Event]SubscribeFunc{},
	}
}

func (r Subscriber) Mount(router FuncRouter) {
	for evnt, subsc := range router {
		r.Func[evnt] = subsc
	}
}

func (r Subscriber) Subscribe(evnt Event, subsc SubscribeFunc) {
	r.Func[evnt] = subsc
}

func (r Subscriber) Serve(ctx context.Context) {
	for evnt, subsc := range r.Func {
		r.MessageBus.Subscribe(evnt)
		go func(subsc SubscribeFunc) {
			for {
				switch v := r.MessageBus.Receive().(type) {
				case redis.Message:
					err := subsc(v)
					r.AppLog.Error(ctx, err)
				case redis.Subscription:
					fmt.Printf("%s: %s %d\n", v.Channel, v.Kind, v.Count)
				case error:
					r.AppLog.Error(ctx, v)
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
