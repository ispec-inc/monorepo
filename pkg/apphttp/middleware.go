package apphttp

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
)

func logError(w *responseWriter, r *http.Request) {
	if w.aerr == nil {
		return
	}

	switch w.aerr.Code() {
	case apperror.CodeError:
		Logger.Error(r.Context(), w.aerr.Code().String(), w.aerr.Error(), w.aerr)
	case apperror.CodeNotFound:
		Logger.Error(r.Context(), w.aerr.Code().String(), w.aerr.Error(), w.aerr)
	}
}
