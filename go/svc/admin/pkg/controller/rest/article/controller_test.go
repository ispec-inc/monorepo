package article

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	pb "github.com/ispec-inc/monorepo/go/proto/admin/api/rest/article"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/database"
	"github.com/stretchr/testify/assert"
)

func TestArticleController_list(t *testing.T) {
	type (
		want struct {
			status int
		}
	)
	tests := []struct {
		name string
		want want
	}{
		{
			name: "ok",
			want: want{status: http.StatusOK},
		},
	}

	db, cleanup := testool.Prepare(t, "article_controller_get", []interface{}{
		&entity.Article{ID: int64(1)},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/", nil)
			req = req.WithContext(applog.WithTestContext(req.Context()))
			res := httptest.NewRecorder()
			newController().list(res, req)
			assert.Equal(t, tt.want.status, res.Code)
		})
	}
}

func TestArticleController_get(t *testing.T) {
	type (
		give struct {
			id string
		}
		want struct {
			status int
		}
	)
	tests := []struct {
		name string
		give give
		want want
	}{
		{
			name: "ok",
			give: give{id: "1"},
			want: want{status: http.StatusOK},
		},
		{
			name: "not found",
			give: give{id: "2"},
			want: want{status: http.StatusNotFound},
		},
	}

	db, cleanup := testool.Prepare(t, "article_controller_get", []interface{}{
		&entity.Article{ID: int64(1)},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/", nil)
			rctx := chi.NewRouteContext()
			rctx.URLParams.Add("id", tt.give.id)
			ctx := context.WithValue(req.Context(), chi.RouteCtxKey, rctx)
			ctx = applog.WithTestContext(ctx)
			req = req.WithContext(ctx)
			res := httptest.NewRecorder()

			newController().get(res, req)
			assert.Equal(t, tt.want.status, res.Code)
		})
	}
}

func TestArticleController_create(t *testing.T) {
	type (
		give struct {
			req *pb.CreateRequest
		}
		want struct {
			status int
		}
	)
	tests := []struct {
		name string
		give give
		want want
	}{
		{
			name: "ok",
			give: give{req: &pb.CreateRequest{Title: "title"}},
			want: want{status: http.StatusOK},
		},
	}

	db, cleanup := testool.Prepare(t, "article_controller_create", []interface{}{})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			body := new(bytes.Buffer)
			if err := json.NewEncoder(body).Encode(tt.give.req); err != nil {
				t.Fatal(err)
			}
			req := httptest.NewRequest(http.MethodPost, "/", body)
			ctx := applog.WithTestContext(req.Context())
			req = req.WithContext(ctx)
			res := httptest.NewRecorder()

			newController().create(res, req)
			assert.Equal(t, tt.want.status, res.Code)
		})
	}
}

func TestArticleController_update(t *testing.T) {
	type (
		give struct {
			id  string
			req *pb.UpdateRequest
		}
		want struct {
			status int
		}
	)
	tests := []struct {
		name string
		give give
		want want
	}{
		{
			name: "ok",
			give: give{id: "1", req: &pb.UpdateRequest{Title: "title"}},
			want: want{status: http.StatusOK},
		},
		{
			name: "not found",
			give: give{id: "2", req: &pb.UpdateRequest{Title: "title"}},
			want: want{status: http.StatusNotFound},
		},
	}

	db, cleanup := testool.Prepare(t, "article_controller_update", []interface{}{
		&entity.Article{ID: int64(1)},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			body := new(bytes.Buffer)
			if err := json.NewEncoder(body).Encode(tt.give.req); err != nil {
				t.Fatal(err)
			}
			req := httptest.NewRequest(http.MethodPut, "/", body)
			rctx := chi.NewRouteContext()
			rctx.URLParams.Add("id", tt.give.id)
			ctx := context.WithValue(req.Context(), chi.RouteCtxKey, rctx)
			ctx = applog.WithTestContext(ctx)
			req = req.WithContext(ctx)
			res := httptest.NewRecorder()

			newController().update(res, req)
			assert.Equal(t, tt.want.status, res.Code)
		})
	}
}

func TestArticleController_delete(t *testing.T) {
	type (
		give struct {
			id string
		}
		want struct {
			status int
		}
	)
	tests := []struct {
		name string
		give give
		want want
	}{
		{
			name: "ok",
			give: give{id: "1"},
			want: want{status: http.StatusOK},
		},
		{
			name: "not found",
			give: give{id: "2"},
			want: want{status: http.StatusNotFound},
		},
	}

	db, cleanup := testool.Prepare(t, "article_controller_delete", []interface{}{
		&entity.Article{ID: int64(1)},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodDelete, "/", nil)
			rctx := chi.NewRouteContext()
			rctx.URLParams.Add("id", tt.give.id)
			ctx := context.WithValue(req.Context(), chi.RouteCtxKey, rctx)
			ctx = applog.WithTestContext(ctx)
			req = req.WithContext(ctx)
			res := httptest.NewRecorder()

			newController().delete(res, req)
			assert.Equal(t, tt.want.status, res.Code)
		})
	}
}
