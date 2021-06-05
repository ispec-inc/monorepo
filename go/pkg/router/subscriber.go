package router

import (
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	notification_event "github.com/ispec-inc/monorepo/go/svc/notification/cmd/server/event"
)

func NewSubscribeServer() (*msgbs.SubscribeServer, func() error, error) {
	ns, evntclnup, err := notification_event.NewSubscriber()
	if err != nil {
		return nil, nil, err
	}

	sr := msgbs.NewSubscribeServer()
	sr.Mount(ns)
	return &sr, evntclnup, nil
}
