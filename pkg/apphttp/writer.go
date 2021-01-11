package apphttp

import (
	"encoding/json"
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
)

type ResponseWriter interface {
	http.ResponseWriter
	WriteError(apperror.Error)
	WriteResponse(interface{})
}

type responseWriter struct {
	http.ResponseWriter
	aerr apperror.Error
}

func newResponseWriter(w http.ResponseWriter) *responseWriter {
	return &responseWriter{
		ResponseWriter: w,
		aerr:           nil,
	}
}

func (w *responseWriter) WriteError(aerr apperror.Error) {
	w.aerr = aerr

	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(code2status[aerr.Code()])

	json.NewEncoder(w).Encode(errorResponse{
		Code:   aerr.Code().String(),
		Detail: aerr.Error(),
	})
}

func (w *responseWriter) WriteResponse(body interface{}) {
	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(code2status[apperror.CodeSuccess])
	json.NewEncoder(w).Encode(body)
}

type errorResponse struct {
	Code   string `json:"code"`
	Detail string `json:"detail"`
}
