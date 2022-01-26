package runner

import (
	"net/http"

	"github.com/go-chi/chi"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	"github.com/graph-gophers/graphql-transport-ws/graphqlws"
	mw "github.com/ispec-inc/monorepo/go/pkg/middleware"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/config"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/database"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/handler"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/middleware"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/schema"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/subscription"
)

func NewGraphQL() (http.Handler, func() error, error) {
	if err := database.Init(nil); err != nil {
		return nil, nil, err
	}

	s, err := schema.String()
	if err != nil {
		return nil, nil, err
	}

	schema := graphql.MustParseSchema(s, handler.New())

	h := graphqlws.NewHandlerFunc(schema, &relay.Handler{Schema: schema})
	r := chi.NewRouter()
	r = mw.Common(r, mw.CommonConfig{
		Timeout:      config.Router.Timeout,
		AllowOrigins: config.Router.AllowOrigins,
	})
	subscription.SubscribeRedis()
	r.Use(middleware.AttatchDataLoader)
	r.Mount("/", h)
	return r, nil, nil
}
