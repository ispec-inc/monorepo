package router

import (
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/pkg/registry"
	notification_event "github.com/ispec-inc/monorepo/go/svc/notification/cmd/server/event"
)

func NewSubscriber(rgst registry.Registry) (*msgbs.Subscriber, func() error, error) {
	atclevnt, evntclnup, err := notification_event.NewRouter()
	if err != nil {
		return nil, nil, err
	}

	sr := msgbs.NewSubscriber(
		rgst.MessageBus().New(),
		applog.New(rgst.Logger().New()),
	)
	sr.Mount(atclevnt)
	return &sr, evntclnup, nil
}
