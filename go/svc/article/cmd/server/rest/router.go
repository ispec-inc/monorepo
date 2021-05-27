package rest

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	v1 "github.com/ispec-inc/monorepo/go/svc/article/pkg/adapter/rest/v1"
	"github.com/ispec-inc/monorepo/go/svc/article/pkg/registry"
)

func NewRouter() (http.Handler, func() error, error) {
	repo, repoCleanup, err := registry.NewRepository()
	if err != nil {
		return nil, nil, err
	}

	lgr, lgrCleanup, err := registry.NewLogger()
	if err != nil {
		return nil, nil, err
	}
	cleanup := func() error {
		repoCleanup()
		lgrCleanup()
		return nil
	}

	rgst := registry.NewRegistry(repo, lgr)

	r := chi.NewRouter()

	r.Mount("/v1", v1.NewRouter(rgst))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		presenter.Response(w, map[string]string{"messsage": "ok"})
	})

	return r, cleanup, err
}
