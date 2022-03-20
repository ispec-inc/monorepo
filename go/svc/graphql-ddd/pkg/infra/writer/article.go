package writer

import (
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"gorm.io/gorm"
)

type Article struct {
	db *gorm.DB
}

func NewArticle(db *gorm.DB) Article {
	return Article{db}
}

func (d Article) Create(a article.Article) error {

	return d.db.Transaction(func(tx *gorm.DB) error {
		e := entity.Article{
			ID:      string(a.ID),
			Title:   string(a.Title),
			Content: string(a.Content),
			UserID:  string(a.UserID),
		}
		if err := tx.Create(&e).Error; err != nil {
			return err
		}
		return nil
	})
}
