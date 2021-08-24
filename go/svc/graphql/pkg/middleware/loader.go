package middleware

import (
	"context"
	"net/http"

	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/loader"
)

func AttatchDataLoader(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		for k, f := range loader.LookUpTable {
			ctx = context.WithValue(ctx, k, dataloader.NewBatchedLoader(f))
		}
		next.ServeHTTP(w, r.WithContext(ctx))
	}

	return http.HandlerFunc(fn)
}
