package main

import (
	"context"

	"github.com/ispec-inc/monorepo/go/pkg/registry"
	"github.com/ispec-inc/monorepo/go/pkg/router"
)

func initRegistry() (registry.Registry, func() error, error) {
	lgr, clnup, err := registry.NewLogger()
	if err != nil {
		return registry.Registry{}, nil, err
	}
	bs, err := registry.NewMessageBus()
	if err != nil {
		return registry.Registry{}, nil, err
	}

	return registry.New(lgr, bs), clnup, nil
}

func main() {
	rgst, rclnup, err := initRegistry()
	if err != nil {
		panic(err)
	}
	defer rclnup()

	svr, hclnup, err := router.NewHTTP(rgst)
	if err != nil {
		panic(err)
	}
	defer hclnup()

	sub, sclnup, err := router.NewSubscriber(rgst)
	if err != nil {
		panic(err)
	}
	defer sclnup()

	ctx := context.Background()

	server := NewServer(svr, sub)
	server.Run(ctx)
}
