package router

import (
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
)

func NewSubscribeServer() (*msgbs.SubscribeServer, func() error, error) {
	sr := msgbs.NewSubscribeServer()

	// ns, evntclnup, err := notification_event.NewSubscriber()
	// if err != nil {
	// 	return nil, nil, err
	// }

	// sr.Mount(ns)
	return &sr, nil, nil
}
