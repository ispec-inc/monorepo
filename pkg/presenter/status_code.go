package presenter

import (
	"encoding/json"
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
)

var CodeStatuses = map[apperror.Code]int{
	apperror.CodeError:    http.StatusInternalServerError,
	apperror.CodeSuccess:  http.StatusOK,
	apperror.CodeNotFound: http.StatusNotFound,
}

func ApplicationException(w http.ResponseWriter, aerr apperror.Error) {
	w.WriteHeader(CodeStatuses[aerr.Code()])

	body := NewErrorResponse(aerr.Message())
	json.NewEncoder(w).Encode(body)
}

func InternalServerError(w http.ResponseWriter, err error) {
	w.WriteHeader(http.StatusInternalServerError)

	body := NewErrorResponse(err.Error())
	json.NewEncoder(w).Encode(body)
}

func BadRequestError(w http.ResponseWriter, err error) {
	w.WriteHeader(http.StatusBadRequest)

	body := NewErrorResponse(err.Error())
	json.NewEncoder(w).Encode(body)
}

func Response(w http.ResponseWriter, body interface{}) {
	w.WriteHeader(CodeStatuses[apperror.CodeSuccess])
	json.NewEncoder(w).Encode(body)
}

type ErrorResponse struct {
	Message string `json:"message"`
}

func NewErrorResponse(msg string) ErrorResponse {
	return ErrorResponse{
		msg,
	}
}
