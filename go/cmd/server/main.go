package main

import (
	"context"

	"github.com/ispec-inc/monorepo/go/pkg/registry"
	"github.com/ispec-inc/monorepo/go/pkg/server"
)

func main() {
	rgst, rclnup, err := registry.New()
	if err != nil {
		panic(err)
	}
	defer rclnup()

	server, sclnup, err := server.New(rgst)
	if err != nil {
		panic(err)
	}
	defer sclnup()

	ctx := context.Background()
	server.Run(ctx)
}
