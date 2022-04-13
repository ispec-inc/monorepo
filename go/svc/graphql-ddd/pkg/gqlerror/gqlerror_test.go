package gqlerror_test

import (
	"context"
	"errors"
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/pkg/lang"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/gqlerror"
	"github.com/stretchr/testify/assert"
)

func TestError_Error(t *testing.T) {
	t.Parallel()

	type (
		give struct {
			err error
		}
		want struct {
			err string
		}
	)

	tests := []struct {
		name string
		give give
		want want
	}{
		{
			name: "error_no_view_article_privilege",
			give: give{
				err: article.ErrNoViewArticlePrivilege,
			},
			want: want{
				err: "no view article privilege",
			},
		},
		{
			name: "apperror_invalid",
			give: give{
				err: apperror.WithCode(apperror.CodeInvalid, errors.New("invalid error")),
			},
			want: want{
				err: "invalid error",
			},
		},
		{
			name: "error_unknown",
			give: give{
				err: errors.New("unknown error"),
			},
			want: want{
				err: "unknown error",
			},
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := gqlerror.New(context.Background(), tt.give.err).Error()
			assert.Equal(t, tt.want.err, got)
		})
	}
}

func TestError_Extensions(t *testing.T) {
	t.Parallel()

	type (
		give struct {
			acceptLanguage string
			err            error
		}
		want struct {
			extensions map[string]interface{}
		}
	)

	tests := []struct {
		name string
		give give
		want want
	}{
		{
			name: "ja_error_no_view_article_privilege",
			give: give{
				acceptLanguage: "ja-JP",
				err:            article.ErrNoViewArticlePrivilege,
			},
			want: want{
				extensions: map[string]interface{}{
					"code":    "NO_VIEW_ARTICLE_PRIVILEGE",
					"message": "記事の閲覧権限がありません。",
				},
			},
		},
		{
			name: "en_error_call_brawsing_prohibited",
			give: give{
				acceptLanguage: "en-US",
				err:            article.ErrNoViewArticlePrivilege,
			},
			want: want{
				extensions: map[string]interface{}{
					"code":    "NO_VIEW_ARTICLE_PRIVILEGE",
					"message": "No view privilege for article.",
				},
			},
		},
		{
			name: "ja_apperror_invalid",
			give: give{
				acceptLanguage: "ja-JP",
				err:            apperror.WithCode(apperror.CodeInvalid, errors.New("invalid error")),
			},
			want: want{
				extensions: map[string]interface{}{
					"code":    "INVALID",
					"message": "リクエストが無効です。",
				},
			},
		},
		{
			name: "en_apperror_invalid",
			give: give{
				acceptLanguage: "en-US",
				err:            apperror.WithCode(apperror.CodeInvalid, errors.New("invalid error")),
			},
			want: want{
				extensions: map[string]interface{}{
					"code":    "INVALID",
					"message": "Invalid request",
				},
			},
		},
		{
			name: "error_unknown",
			give: give{
				err: errors.New("unknown error"),
			},
			want: want{
				extensions: nil,
			},
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			ctx := lang.ContextWithTag(context.Background(), tt.give.acceptLanguage)
			got := gqlerror.New(ctx, tt.give.err).Extensions()
			assert.Equal(t, tt.want.extensions, got)
		})
	}
}
