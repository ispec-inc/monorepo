package loader

import (
	"github.com/graph-gophers/dataloader"
)

type key string

const (
	heroKey          = "hero"
	userKey          = "user"
	articleByUserKey = "articleByUser"
)

var (
	LookUpTable = map[key]dataloader.BatchFunc{
		heroKey:          batchLoadHero,
		userKey:          batchLoadUser,
		articleByUserKey: batchLoadArticlesByUserID,
	}
)
