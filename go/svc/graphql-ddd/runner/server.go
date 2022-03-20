package runner

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	mw "github.com/ispec-inc/monorepo/go/pkg/middleware"
	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/config"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/handler"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/schema"
)

func New() (http.Handler, func() error, error) {
	s, err := schema.String()
	if err != nil {
		return nil, nil, err
	}

	rgst, cleanup, err := registry.New()
	if err != nil {
		return nil, cleanup, err
	}

	schema := graphql.MustParseSchema(s, handler.New(rgst))

	h := &relay.Handler{Schema: schema}
	r := chi.NewRouter()
	r = mw.Common(r, mw.CommonConfig{
		Timeout:      config.Router.Timeout,
		AllowOrigins: config.Router.AllowOrigins,
	})

	r.Mount("/", h)
	r.Group(func(r chi.Router) {
		r.Mount("/graphql", h)
	})
	r.Get("/schema.graphql", func(w http.ResponseWriter, r *http.Request) {
		presenter.Text(w, s)
	})
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		presenter.Response(w, map[string]string{"messsage": "ok"})
	})
	return r, cleanup, nil
}
