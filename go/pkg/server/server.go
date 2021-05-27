package server

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/pkg/registry"
	"github.com/ispec-inc/monorepo/go/pkg/router"
	"golang.org/x/sync/errgroup"
)

type Server struct {
	HTTPServer *http.Server
	Subscriber *msgbs.Subscriber
}

func New(
	rgst registry.Registry,
) (Server, func() error, error) {
	h, hclnup, err := router.NewHTTP(rgst)
	if err != nil {
		return Server{}, nil, err
	}

	s, sclnup, err := router.NewSubscriber(rgst)
	if err != nil {
		return Server{}, nil, err
	}

	clnup := func() error {
		hclnup()
		sclnup()
		return nil
	}
	return Server{
		HTTPServer: h,
		Subscriber: s,
	}, clnup, nil
}

func (s Server) Run(ctx context.Context) {
	g, ctx := errgroup.WithContext(ctx)
	g.Go(func() error {
		err := s.HTTPServer.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			return err
		}

		return nil
	})

	g.Go(func() error {
		s.Subscriber.Serve(ctx)
		return nil
	})

	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	cs := make(chan os.Signal, 1)
	signal.Notify(cs, syscall.SIGINT, syscall.SIGTERM, syscall.SIGHUP)

	select {
	case <-ctx.Done():
		break
	case <-cs:
		break
	}

	ctx, tcancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer tcancel()

	err := g.Wait()
	if err != nil {
		os.Exit(2)
	}

	s.HTTPServer.Shutdown(ctx)
	s.Subscriber.Shutdown()
}
