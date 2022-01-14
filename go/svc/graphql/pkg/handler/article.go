package handler

import (
	"context"
	"encoding/json"

	"github.com/gomodule/redigo/redis"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver/mutation"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/subscription"
)

type QueryArticleArgs struct {
	ID     graphql.ID
	UserID *graphql.ID
}

func (h Handler) Articles(
	ctx context.Context,
	args QueryArticleArgs,
) (*[]*resolver.Article, error) {

	ms := model.Articles{}
	if err := ms.Find(); err != nil {
		return nil, err
	}

	as := make([]*resolver.Article, len(ms))
	for i := range ms {
		as[i] = resolver.NewArticle(ctx, ms[i])
	}

	return &as, nil
}

type MutationArticleArgs struct {
	Title string
	Body  string
}

func (h Handler) CreateArticle(
	ctx context.Context,
	args MutationArticleArgs,
) (*resolver.Article, error) {
	return mutation.CreateArticle(ctx, args.Title, args.Body)
}

func (h Handler) ArticleAdded(
	ctx context.Context,
) <-chan *resolver.Article {
	c := make(chan *resolver.Article)
	subscription.Subscribe(msgbs.AddArticle, func(msg redis.Message) {
		var ma msgbs.Article
		err := json.Unmarshal(msg.Data, &ma)
		if err != nil {
			return
		}
		var m model.Article
		if err := m.Find(ma.ID); err != nil {
			return
		}
		c <- resolver.NewArticle(ctx, m)
	})
	return c
}
