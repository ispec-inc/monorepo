package presenter

import (
	"encoding/json"
	"net/http"

	"github.com/ispec-inc/monorepo/server/pkg/apperror"
)

func ApplicationException(w http.ResponseWriter, err error) {
	aerr := apperror.Unwrap(err)
	if aerr == nil {
		InternalServerError(w, err)
		return
	}

	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(code2status[aerr.Code()])

	body := newErrorResponse(aerr.Code(), aerr.Error())
	json.NewEncoder(w).Encode(body)
}

func InternalServerError(w http.ResponseWriter, err error) {
	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(http.StatusInternalServerError)

	body := newErrorResponse(apperror.CodeError, err.Error())
	json.NewEncoder(w).Encode(body)
}

func BadRequestError(w http.ResponseWriter, err error) {
	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(http.StatusBadRequest)

	body := newErrorResponse(apperror.CodeInvalid, err.Error())
	json.NewEncoder(w).Encode(body)
}

func Response(w http.ResponseWriter, body interface{}) {
	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(body)
}
