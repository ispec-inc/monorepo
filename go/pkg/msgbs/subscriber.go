package msgbs

import (
	"context"
	"fmt"

	"github.com/gomodule/redigo/redis"
	"github.com/ispec-inc/monorepo/go/pkg/applog"
)

type SubscribeFunc func(context.Context, redis.Message) error

type Subscriber struct {
	MessageBus MessageBus
	Router     map[Event]SubscribeFunc
	AppLog     applog.AppLog
}

type Router map[Event]SubscribeFunc

func NewRouter() Router {
	return Router{}
}

func (fr Router) Subscribe(evnt Event, subsc SubscribeFunc) {
	fr[evnt] = subsc
}

func (fr Router) Mount(router Router) {
	for evnt, subsc := range router {
		fr[evnt] = subsc
	}
}

func NewSubscriber(msgbs MessageBus, algr applog.AppLog) Subscriber {
	return Subscriber{
		MessageBus: msgbs,
		AppLog:     algr,
		Router:     map[Event]SubscribeFunc{},
	}
}

func (r Subscriber) Mount(router Router) {
	for evnt, subsc := range router {
		r.Router[evnt] = subsc
	}
}

func (r Subscriber) Subscribe(evnt Event, subsc SubscribeFunc) {
	r.Router[evnt] = subsc
}

func (r Subscriber) Serve(ctx context.Context) {
	for evnt, subsc := range r.Router {
		r.MessageBus.Subscribe(evnt)
		go func(subsc SubscribeFunc) {
			for {
				switch v := r.MessageBus.Receive().(type) {
				case redis.Message:
					err := subsc(ctx, v)
					if err != nil {
						r.AppLog.Error(ctx, err)
					}
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
	for evnt := range r.Router {
		r.MessageBus.Unsubscribe(evnt)
	}
}
