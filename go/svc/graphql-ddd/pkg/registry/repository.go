package registry

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/config"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/command"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/reader"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/writer"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository() (Repository, func() error, error) {
	var loglev rdb.LogLevel
	if config.MysqlArticle.ShowAllLog {
		loglev = rdb.LogLevelInfo
	} else {
		loglev = rdb.LogLevelError
	}

	db, err := rdb.New(rdb.Config{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlArticle.User,
			Password: config.MysqlArticle.Password,
			Host:     config.MysqlArticle.Host,
			Port:     config.MysqlArticle.Port,
			Database: config.MysqlArticle.Database,
		},
		LogLevel:    loglev,
		MaxIdleConn: config.MysqlArticle.MaxIdleConn,
		MaxOpenConn: config.MysqlArticle.MaxOpenConn,
		MaxLifetime: config.MysqlArticle.MaxLifetime,
	})
	if err != nil {
		return Repository{}, func() error { return nil }, err
	}

	repo := Repository{
		db: db,
	}
	cleanup := func() error { return nil }
	return repo, cleanup, nil
}

func (r Repository) NewUserQuery() query.User {
	return reader.NewUser(r.db)
}

func (r Repository) NewArticleQuery() query.Article {
	return reader.NewArticle(r.db)
}

func (r Repository) NewArticleCommand() command.Article {
	return writer.NewArticle(r.db)
}
