package event

import (
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/notification/pkg/adapter/event/notification"
	"github.com/ispec-inc/monorepo/go/svc/notification/pkg/registry"
)

func NewRouter() (msgbs.FuncRouter, func() error, error) {
	lgr, lgrCleanup, err := registry.NewLogger()
	if err != nil {
		return msgbs.FuncRouter{}, nil, err
	}
	cleanup := func() error {
		lgrCleanup()
		return nil
	}

	rgst := registry.NewRegistry(lgr)

	r := msgbs.NewRouter()

	subsc := notification.NewSubscriber(rgst)

	r.Subscribe(msgbs.AddArticle, subsc.Notify)

	return r, cleanup, nil
}
