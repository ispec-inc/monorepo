package article

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/resolver"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/uc"
)

type PostArticleArgs struct {
	Input struct {
		Title   string
		Content string
	}
}

func (a Adapter) PostArticle(ctx context.Context, args PostArticleArgs) (*resolver.Article, error) {
	ipt := uc.PostArticleInput{
		Title:      article.Title(args.Input.Title),
		Content:    article.Content(args.Input.Content),
		PostUserID: user.ID("id"),
	}
	post := uc.NewPostArticle(a.registry)
	opt, err := post.Do(ctx, ipt)
	if err != nil {
		return nil, err
	}

	rslvr := resolver.NewArticle(ctx, opt.Article)

	return rslvr, nil
}
