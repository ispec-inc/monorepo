package user

import (
	"context"
	"strconv"

	"github.com/graph-gophers/dataloader"
	"github.com/graphql-go/graphql"
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/pkg/msgbs"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/logger"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/redisbs"
)

type Loader struct {
	log applog.AppLog
	bs  msgbs.MessageBus
}

func NewLoader() Loader {
	return Loader{
		log: applog.New(logger.Get()),
		bs:  redisbs.Get(),
	}
}

func (l Loader) Do(params graphql.ResolveParams) (interface{}, error) {
	loader := dataloader.NewBatchedLoader(l.batch)
	key := dataloader.StringKey(params.Args["id"].(string))
	thunk := loader.Load(context.TODO(), key)
	result, err := thunk()
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (l Loader) batch(ctx context.Context, keys dataloader.Keys) []*dataloader.Result {

	ids := make([]int64, len(keys))

	for i := range keys {
		i, err := strconv.Atoi(keys[i].String())
		if err != nil {
			continue
		}
		ids[i] = int64(i)
	}

	var usrs model.Users
	if err := usrs.List(ids); err != nil {
		l.log.Error(ctx, err)
		return nil
	}

	results := make([]*dataloader.Result, len(usrs))

	for i := range usrs {
		results[i].Data = usrs[i]
	}
	return results
}
