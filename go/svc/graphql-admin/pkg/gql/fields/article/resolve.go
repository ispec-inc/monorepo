package article

import (
	"github.com/graphql-go/graphql"
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/logger"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/redisbs"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/view"
)

type resolver struct {
	log applog.AppLog
	bs  msgbs.MessageBus
}

func newResolver() resolver {
	return resolver{
		log: applog.New(logger.Get()),
		bs:  redisbs.Get(),
	}
}

func (r resolver) list(params graphql.ResolveParams) (interface{}, error) {
	atls := model.Articles{}
	if err := atls.Find(); err != nil {
		r.log.Error(params.Context, err)
		return nil, err
	}

	as := view.NewArticles(&atls)
	return as, nil
}
