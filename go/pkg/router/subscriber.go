package router

import (
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/pkg/registry"
	notification_event "github.com/ispec-inc/monorepo/go/svc/notification/cmd/server/event"
)

func NewSubscriber(rgst registry.Registry) (*msgbs.Subscriber, func() error, error) {
	ntevnt, evntclnup, err := notification_event.NewSubscriber()
	if err != nil {
		return nil, nil, err
	}

	sr := msgbs.NewSubscriberServer()
	sr.Mount(ntevnt)
	return &sr, evntclnup, nil
}
