package testool

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/monorepo/go/pkg/applog"
)

type request struct {
	method   string
	path     string
	urlparam map[string]string
	body     interface{}
}

func NewRequest(method, path string, body interface{}) *request {
	return &request{
		method:   method,
		path:     path,
		urlparam: make(map[string]string),
		body:     body,
	}
}

func (r *request) AddURLParam(key, val string) {
	r.urlparam[key] = val
}

func (r *request) Parse(t *testing.T) *http.Request {
	req := httptest.NewRequest(r.method, r.path, r.encodeBody(t))
	ctx := r.withURLParamContext(req.Context())
	ctx = applog.WithTestContext(ctx)
	return req.WithContext(ctx)
}

func (r *request) encodeBody(t *testing.T) io.Reader {
	body := new(bytes.Buffer)
	if err := json.NewEncoder(body).Encode(r.body); err != nil {
		t.Fatal(err)
	}
	return body
}

func (r *request) withURLParamContext(ctx context.Context) context.Context {
	rctx := chi.NewRouteContext()
	for key, val := range r.urlparam {
		rctx.URLParams.Add(key, val)
	}
	return context.WithValue(ctx, chi.RouteCtxKey, rctx)
}
