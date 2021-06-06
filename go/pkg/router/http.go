package router

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/monorepo/go/pkg/config"
	"github.com/ispec-inc/monorepo/go/pkg/middleware"
	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	admin "github.com/ispec-inc/monorepo/go/svc/admin/cmd/server/rest"
	article "github.com/ispec-inc/monorepo/go/svc/article/cmd/server/rest"
	media "github.com/ispec-inc/monorepo/go/svc/media/cmd/server/rest"
)

func NewHTTP() (*http.Server, func() error, error) {
	adh, adclnup, err := admin.NewRouter()
	if err != nil {
		return nil, nil, err
	}

	atclh, arclclnup, err := article.NewRouter()
	if err != nil {
		return nil, nil, err
	}

	mdh, mdclnup, err := media.NewRouter()
	if err != nil {
		return nil, nil, err
	}

	r := chi.NewRouter()
	r = middleware.Common(r)

	r.Mount("/admin", adh)
	r.Mount("/articles", atclh)
	r.Mount("/media", mdh)
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		presenter.Response(w, map[string]string{"messsage": "ok"})
	})

	clnup := func() error {
		if adclnup() != nil {
			return err
		}
		if arclclnup() != nil {
			return err
		}
		if mdclnup() != nil {
			return err
		}
		return nil
	}

	port := fmt.Sprintf(":%d", config.Router.Port)
	srv := &http.Server{Addr: port, Handler: r}
	return srv, clnup, nil

}
