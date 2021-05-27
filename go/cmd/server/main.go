package main

import (
	"context"

	"github.com/ispec-inc/monorepo/go/pkg/registry"
	"github.com/ispec-inc/monorepo/go/pkg/router"
	"github.com/ispec-inc/monorepo/go/pkg/server"
)

func main() {
	rgst, rclnup, err := registry.New()
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

	server := server.New(svr, sub)
	server.Run(ctx)
}
