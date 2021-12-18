package middleware

import (
	"context"
	"net/http"

	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/loader"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

func AttatchDataLoader(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		for k, f := range loader.LookUpTable {
			ldr := f(registry.GetRepository())
			ctx = context.WithValue(ctx, k, dataloader.NewBatchedLoader(ldr.Load))
		}
		next.ServeHTTP(w, r.WithContext(ctx))
	}

	return http.HandlerFunc(fn)
}
