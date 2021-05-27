package event

import (
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/notification/pkg/adapter/event/notification"
	"github.com/ispec-inc/monorepo/go/svc/notification/pkg/registry"
)

func NewRouter() (msgbs.Router, func() error, error) {
	lgr, lgrCleanup, err := registry.NewLogger()
	if err != nil {
		return msgbs.Router{}, nil, err
	}
	cleanup := func() error {
		lgrCleanup()
		return nil
	}

	rgst := registry.NewRegistry(lgr)

	r := msgbs.NewRouter()

	nr := notification.NewRouter(rgst)

	r.Mount(nr)
	return r, cleanup, nil
}
