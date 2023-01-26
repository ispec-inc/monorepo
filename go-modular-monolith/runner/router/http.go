package router

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	ddd "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/runner"
	"go.uber.org/multierr"
)

const PORT = 9000

func NewHTTP() (*http.Server, func() error, error) {
	routers := []struct {
		new  func() (http.Handler, func() error, error)
		path string
	}{
		{new: ddd.New, path: "/graphql-ddd"},
	}

	r := chi.NewRouter()
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		presenter.Response(w, map[string]string{"messsage": "ok"})
	})

	clnups := make([]func() error, len(routers))
	for i, router := range routers {
		h, clnup, err := router.new()
		if err != nil {
			return nil, nil, err
		}
		r.Mount(router.path, h)
		clnups[i] = clnup
	}

	clnup := func() error {
		var errs error
		for _, c := range clnups {
			if c != nil {
				errs = multierr.Append(errs, c())
			}
		}
		return errs
	}

	port := fmt.Sprintf(":%d", PORT)

	srv := &http.Server{Addr: port, Handler: r}
	return srv, clnup, nil

}
