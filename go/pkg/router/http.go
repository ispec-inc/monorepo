package router

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/monorepo/go/pkg/config"
	"github.com/ispec-inc/monorepo/go/pkg/middleware"
	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	"github.com/ispec-inc/monorepo/go/pkg/registry"
	admin_rest "github.com/ispec-inc/monorepo/go/svc/admin/cmd/server/rest"
	article_rest "github.com/ispec-inc/monorepo/go/svc/article/cmd/server/rest"
)

func NewHTTP(rgst registry.Registry) (*http.Server, func() error, error) {
	adh, adclnup, err := admin_rest.NewRouter(rgst)
	if err != nil {
		return nil, nil, err
	}

	atclh, arclclnup, err := article_rest.NewRouter()
	if err != nil {
		return nil, nil, err
	}

	r := chi.NewRouter()
	r = middleware.Common(r)

	r.Mount("/admin", adh)
	r.Mount("/articles", atclh)
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		presenter.Response(w, map[string]string{"messsage": "ok"})
	})

	clnup := func() error {
		err := adclnup()
		if err != nil {
			return err
		}

		err = arclclnup()
		if err != nil {
			return err
		}
		return nil
	}

	port := fmt.Sprintf(":%d", config.Router.Port)
	srv := &http.Server{Addr: port, Handler: r}
	return srv, clnup, nil

}
