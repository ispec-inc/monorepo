package loader

import (
	"github.com/graph-gophers/dataloader"
)

type key string

const (
	userKey          = "user"
	articleByUserKey = "articleByUser"
)

var (
	LookUpTable = map[key]dataloader.BatchFunc{
		userKey:          batchLoadUser,
		articleByUserKey: batchLoadArticlesByUserID,
	}
)
