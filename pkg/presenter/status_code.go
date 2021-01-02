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
	apperror.CodeInvalid:  http.StatusBadRequest,
}

type messageResponse struct {
	Message string `json:"message"`
}

func newMessageResponse(msg string) messageResponse {
	return messageResponse{
		Message: msg,
	}
}

func ApplicationException(w http.ResponseWriter, aerr apperror.Error) {
	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(CodeStatuses[aerr.Code()])
	body := newMessageResponse(aerr.Message())
	json.NewEncoder(w).Encode(body)
}

func InternalServerError(w http.ResponseWriter, err error) {
	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(http.StatusInternalServerError)
	body := newMessageResponse(err.Error())
	json.NewEncoder(w).Encode(body)
}

func BadRequestError(w http.ResponseWriter, err error) {
	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(http.StatusBadRequest)
	body := newMessageResponse(err.Error())
	json.NewEncoder(w).Encode(body)
}

func Success(w http.ResponseWriter) {
	w.WriteHeader(http.StatusOK)
	body := newMessageResponse("success")
	json.NewEncoder(w).Encode(body)
}

func Response(w http.ResponseWriter, body interface{}) {
	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(CodeStatuses[apperror.CodeSuccess])
	json.NewEncoder(w).Encode(body)
}
