package invitation

import (
	"errors"
)

type addCodeRequest struct {
	UserID int64  `json:"user_id"`
	Code   string `json:"code"`
}

func (r addCodeRequest) validate() error {
	if r.UserID == 0 {
		return errors.New("error : missing user_id in request")
	}
	if r.Code == "" {
		return errors.New("error : missing code in request")
	}
	return nil
}
