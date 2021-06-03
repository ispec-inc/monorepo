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
	Router     Router
	AppLog     applog.AppLog
}

func NewSubscriber(msgbs MessageBus, algr applog.AppLog) Subscriber {
	return Subscriber{
		MessageBus: msgbs,
		AppLog:     algr,
		Router:     map[Event][]SubscribeFunc{},
	}
}

func (s Subscriber) Subscribe(evnt Event, subsc SubscribeFunc) {
	s.Router.Subscribe(evnt, subsc)
}

func (s Subscriber) Mount(rtr Router) {
	for evnt, sfuncs := range rtr {
		for _, sfunc := range sfuncs {
			s.Router[evnt] = append(s.Router[evnt], sfunc)
		}
	}
}

func (s Subscriber) Do(ctx context.Context) {
	for evnt, sfuncs := range s.Router {
		s.MessageBus.Subscribe(evnt)
		for _, sfunc := range sfuncs {
			go func(sfunc SubscribeFunc) {
				for {
					switch v := s.MessageBus.Receive().(type) {
					case redis.Message:
						err := sfunc(ctx, v)
						if err != nil {
							s.AppLog.Error(ctx, err)
						}
					case redis.Subscription:
						fmt.Printf("%s: %s %d\n", v.Channel, v.Kind, v.Count)
					case error:
						s.AppLog.Error(ctx, v)
					}
				}
			}(sfunc)
		}
	}
}

type Router map[Event][]SubscribeFunc

func NewRouter() Router {
	return Router{}
}

func (r Router) Subscribe(evnt Event, subsc SubscribeFunc) {
	r[evnt] = append(r[evnt], subsc)
}

type SubscribeServer []Subscriber

func NewSubscribeServer() SubscribeServer {
	return SubscribeServer{}
}

func (r SubscribeServer) Serve(ctx context.Context) {
	for _, subsc := range r {
		subsc.Do(ctx)
	}
}

func (s SubscribeServer) Mount(subsc Subscriber) {
	s = append(s, subsc)
}

func (s SubscribeServer) Shutdown() {
	for _, subsc := range s {
		for evnt := range subsc.Router {
			subsc.MessageBus.Unsubscribe(evnt)
		}
	}
}
