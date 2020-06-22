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
	http.Error(w, aerr.Message(), CodeStatuses[aerr.Code()])
}

func InternalServerError(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusInternalServerError)
}

func BadRequestError(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusBadRequest)
}

func Response(w http.ResponseWriter, body interface{}) {
	w.WriteHeader(CodeStatuses[apperror.CodeSuccess])
	json.NewEncoder(w).Encode(body)
}
