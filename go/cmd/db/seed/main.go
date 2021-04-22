package main

import (
	"github.com/ispec-inc/monorepo/go/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/pkg/mysql"
	"gorm.io/gorm"
)

var seeds = []interface{}{
	[]*entity.User{
		{
			Name:        "name-1",
			Description: "desc-1",
			Email:       "email-1",
			Articles: []entity.Article{
				{Title: "article-1", Body: "This is article 1."},
				{Title: "article-2", Body: "This is article 2."},
			},
		},
		{
			Name:        "name-2",
			Description: "desc-2",
			Email:       "email-2",
		},
	},
}

func main() {
	db, err := mysql.New()
	if err != nil {
		panic(err)
	}
	err = db.Transaction(func(tx *gorm.DB) error {
		for _, s := range seeds {
			if err := tx.Create(s).Error; err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		return
	}
}
