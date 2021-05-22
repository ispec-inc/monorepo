package event

import (
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/notification/pkg/adapter/event/notification"
	"github.com/ispec-inc/monorepo/go/svc/notification/pkg/registry"
)

func NewSubscriber(bs msgbs.MessageBus) (msgbs.Subscriber, func() error, error) {
	lgr, lgrCleanup, err := registry.NewLogger()
	if err != nil {
		return msgbs.Subscriber{}, nil, err
	}
	cleanup := func() error {
		lgrCleanup()
		return nil
	}

	rgst := registry.NewRegistry(lgr)
	r := msgbs.NewSubscriber(bs)

	subsc := notification.NewSubscriber(rgst)

	r.Subscribe(msgbs.AddArticle, subsc.Notify)

	return r, cleanup, nil
}
