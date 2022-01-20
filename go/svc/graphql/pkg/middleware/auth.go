package middleware

import (
	"context"
	"errors"
	"net/http"

	"github.com/ispec-inc/monorepo/go/engine/authn"
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/logger"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/database"
)

type ctxKey int

const (
	userIDKey ctxKey = iota
)

type auth struct {
	log applog.AppLog
}

func NewAuth() auth {
	return auth{
		log: applog.New(logger.Get()),
	}
}

func (a auth) VerifyUser(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if err := database.Init(nil); err != nil {
			presenter.InternalServerError(w, err)
			return
		}

		tkn, err := extractToken(r.Header.Get("Authorization"))
		if err != nil {
			presenter.UnauthorizedError(w, err)
			return
		}

		if tkn == "" {
			next.ServeHTTP(w, r)
			return
		}

		a, err := authn.NewAuthN(r.Context())
		if err != nil {
			presenter.InternalServerError(w, err)
			return
		}
		userID, err := a.Login(r.Context(), tkn)
		if err != nil {
			presenter.InternalServerError(w, err)
			return
		}

		ctx := context.WithValue(r.Context(), userIDKey, userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
	return http.HandlerFunc(fn)
}

func extractToken(token string) (string, error) {
	if token == "" {
		return "", nil
	}

	if token[:7] != "Bearer " {
		return "", errors.New("token is not Bearer")
	}
	return token[7:], nil
}

func GetUserID(ctx context.Context) (int64, bool) {
	id, ok := ctx.Value(userIDKey).(int64)
	return id, ok
}
