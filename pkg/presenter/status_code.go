package presenter

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
)

var code2status = map[apperror.Code]int{
	apperror.CodeError:    http.StatusInternalServerError,
	apperror.CodeSuccess:  http.StatusOK,
	apperror.CodeNotFound: http.StatusNotFound,
	apperror.CodeInvalid:  http.StatusBadRequest,
}
