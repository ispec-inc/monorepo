package runner

import (
	"net/http"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/database"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/schema"
)

func NewGraphQL() (http.Handler, func() error, error) {
	if err := database.Init(nil); err != nil {
		return nil, nil, err
	}

	s, err := schema.String()
	if err != nil {
		return nil, nil, err
	}

	schema := graphql.MustParseSchema(s, resolver.NewQuery())

	return &relay.Handler{Schema: schema}, nil, nil
}
