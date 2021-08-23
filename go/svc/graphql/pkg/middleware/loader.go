package middleware

import (
	"net/http"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/loader"
)

func AttatchDataLoader(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		ctx := loader.NewLookUp().Attach(r.Context())
		next.ServeHTTP(w, r.WithContext(ctx))
	}

	return http.HandlerFunc(fn)
}
