package loader

import (
	"github.com/graph-gophers/dataloader"
)

type key string

const (
	userKey    = "user"
	articleKey = "article"
)

var (
	LookUpTable = map[key]dataloader.BatchFunc{
		userKey:    batchLoadUser,
		articleKey: batchLoadArticleByUserIDs,
	}
)
