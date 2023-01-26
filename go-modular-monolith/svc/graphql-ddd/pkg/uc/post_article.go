package uc

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/command"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type PostArticleInput struct {
	Title      article.Title
	Content    article.Content
	PostUserID user.ID
}

type PostArticleOutput struct {
	Article article.Article
}

type PostArticle struct {
	cmd  command.Article
	usrq query.User
}

func NewPostArticle(
	rgst registry.Registry,
) PostArticle {
	return PostArticle{
		cmd:  rgst.Repository().NewArticleCommand(),
		usrq: rgst.Repository().NewUserQuery(),
	}
}

func (u PostArticle) Do(ctx context.Context, ipt PostArticleInput) (PostArticleOutput, error) {

	usr, err := u.usrq.Get(ipt.PostUserID)
	if err != nil {
		return PostArticleOutput{}, err
	}

	artcl, err := article.Post(
		ipt.Title,
		ipt.Content,
		usr,
	)
	if err != nil {
		return PostArticleOutput{}, err
	}

	if err := u.cmd.Create(artcl); err != nil {
		return PostArticleOutput{}, err
	}

	return PostArticleOutput{
		Article: artcl,
	}, err
}
