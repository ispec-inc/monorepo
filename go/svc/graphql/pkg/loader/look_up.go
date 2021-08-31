package loader

import (
	"github.com/graph-gophers/dataloader"
)

type key string

const (
	userKey          = "user"
	articleByUserKey = "article_by_user"
)

var (
	LookUpTable = map[key]dataloader.BatchFunc{
		userKey:          batchLoadUser,
		articleByUserKey: batchLoadArticlesByUserID,
	}
)
