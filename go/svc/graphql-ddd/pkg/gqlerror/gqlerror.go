package gqlerror

import (
	"context"
	"errors"

	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/pkg/lang"
	"golang.org/x/text/message"
)

type Error struct {
	s          string
	extensions map[string]interface{}
}

func New(ctx context.Context, err error) Error {
	v, ok := newFromApperror(ctx, err)
	if ok {
		return v
	}

	v, ok = newFromDomainError(ctx, err)
	if ok {
		return v
	}

	return Error{s: err.Error()}
}

func newFromApperror(ctx context.Context, err error) (Error, bool) {
	aerr := apperror.Unwrap(err)
	if aerr == nil {
		return Error{}, false
	}
	code, ok := apperrorCodes[aerr.Code()]
	if !ok {
		return Error{}, false
	}
	v := Error{
		s: err.Error(),
		extensions: map[string]interface{}{
			"code": code,
		},
	}
	if key, ok := apperrorKeys[aerr.Code()]; ok {
		tag := lang.TagFromContext(ctx)
		msg := message.NewPrinter(tag).Sprintf(key)
		v.extensions["message"] = msg
	}
	return v, true
}

func newFromDomainError(ctx context.Context, err error) (Error, bool) {
	for domainError, code := range domainErrorCodes {
		if !errors.Is(err, domainError) {
			continue
		}
		v := Error{
			s: err.Error(),
			extensions: map[string]interface{}{
				"code": code,
			},
		}
		if key, ok := domainErrorKeys[domainError]; ok {
			tag := lang.TagFromContext(ctx)
			msg := message.NewPrinter(tag).Sprintf(key)
			v.extensions["message"] = msg
		}
		return v, true
	}
	return Error{}, false
}

func (e Error) Error() string {
	return e.s
}

func (e Error) Extensions() map[string]interface{} {
	return e.extensions
}
