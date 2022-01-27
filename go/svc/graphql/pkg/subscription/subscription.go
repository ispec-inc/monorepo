package subscription

import (
	"context"
	"fmt"

	"github.com/gomodule/redigo/redis"
	"github.com/google/uuid"
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/redisbs"
)

type Subscription struct {
	bs          *msgbs.RedisMessageBus
	subscribers map[msgbs.Event][]string
	messages    map[msgbs.Event]chan redis.Message
}

func newSubscription(bs *msgbs.RedisMessageBus) Subscription {
	return Subscription{
		bs:          bs,
		subscribers: make(map[msgbs.Event][]string),
		messages:    make(map[msgbs.Event]chan redis.Message),
	}
}

func (s Subscription) Listen() {
	for {
		switch msg := s.bs.Receive().(type) {
		case redis.Message:
			evnt := msgbs.Event(msg.Channel)
			if s.messages[evnt] == nil {
				s.messages[evnt] = make(chan redis.Message)
			}
			ch := s.messages[evnt]
			for range s.subscribers[evnt] {
				ch <- msg
			}
		}
	}
}

func (s Subscription) Subscribe(
	ctx context.Context,
	evnt msgbs.Event,
	handler func(msg redis.Message),
) {
	bs := redisbs.Get()
	bs.Subscribe(evnt)
	id := s.addSubscriber(evnt)
	go func() {
		defer func() {
			if r := recover(); r != nil {
				err := fmt.Errorf("panic recovered: %v", r)
				print(err)
			}
		}()
		for {
			select {
			case <-ctx.Done():
				s.removeSubscriber(evnt, id)
				return
			case msg := <-s.messages[evnt]:
				handler(msg)
			}
		}
	}()
}

func (s Subscription) removeSubscriber(evnt msgbs.Event, id string) {
	for i := range s.subscribers[evnt] {
		if s.subscribers[evnt][i] == id {
			newSubs := s.subscribers[evnt][:i]
			if len(newSubs) != len(s.subscribers[evnt])-1 {
				newSubs = append(newSubs, s.subscribers[evnt][i+1:]...)
			}
			s.subscribers[evnt] = newSubs
		}
	}
}

func (s Subscription) addSubscriber(evnt msgbs.Event) (id string) {
	id = uuid.New().String()
	if s.messages[evnt] == nil {
		s.messages[evnt] = make(chan redis.Message)
	}
	s.subscribers[evnt] = append(s.subscribers[evnt], id)
	return
}
