package router

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	admin "github.com/ispec-inc/monorepo/go/svc/admin/pkg/router"
	article "github.com/ispec-inc/monorepo/go/svc/article/pkg/router"
	media "github.com/ispec-inc/monorepo/go/svc/media/pkg/router"
)

const PORT = 9000

func NewHTTP() (*http.Server, func() error, error) {
	adr, adclnup, err := admin.NewREST()
	if err != nil {
		return nil, nil, err
	}

	atclr, arclclnup, err := article.NewREST()
	if err != nil {
		return nil, nil, err
	}

	mdr, mdclnup, err := media.NewREST()
	if err != nil {
		return nil, nil, err
	}

	r := chi.NewRouter()

	r.Mount("/admin", adr)
	r.Mount("/articles", atclr)
	r.Mount("/media", mdr)
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

	port := fmt.Sprintf(":%d", PORT)
	srv := &http.Server{Addr: port, Handler: r}
	return srv, clnup, nil

}
