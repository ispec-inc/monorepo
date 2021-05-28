package rest

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	"github.com/ispec-inc/monorepo/go/pkg/registry"
	v1 "github.com/ispec-inc/monorepo/go/svc/admin/pkg/controller/rest/v1"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/database"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/logger"
)

func NewRouter(rgst registry.Registry) (http.Handler, func() error, error) {
	if err := database.Init(nil); err != nil {
		return nil, nil, err
	}
	cleanup, err := logger.Init()
	if err != nil {
		return nil, nil, err
	}

	r := chi.NewRouter()

	r.Mount("/v1", v1.NewRouter(rgst.MessageBus().New()))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		presenter.Response(w, map[string]string{"messsage": "ok"})
	})

	return r, cleanup, nil
}
