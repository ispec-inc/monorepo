package registry

import (
	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/config"
)

var regi Registry

func Get() Registry {
	return regi
}

type Registry struct {
	repo  Repository
	svc   Service
	lgr   Logger
	msgbs MessageBus
}

func New() (*Registry, func() error, error) {
	var loglev rdb.LogLevel
	if config.MysqlJamRoll.ShowAllLog {
		loglev = rdb.LogLevelInfo
	} else {
		loglev = rdb.LogLevelError
	}

	db, err := rdb.New(rdb.Config{
		DBMS: rdb.DBMSMySQL,
		Conn: rdb.Connection{
			User:     config.MysqlJamRoll.User,
			Password: config.MysqlJamRoll.Password,
			Host:     config.MysqlJamRoll.Host,
			Port:     config.MysqlJamRoll.Port,
			Database: config.MysqlJamRoll.Database,
		},
		LogLevel:    loglev,
		MaxIdleConn: config.MysqlJamRoll.MaxIdleConn,
		MaxOpenConn: config.MysqlJamRoll.MaxOpenConn,
		MaxLifetime: config.MysqlJamRoll.MaxLifetime,
	})
	if err != nil {
		return nil, func() error { return nil }, err
	}

	repo, rf, err := NewRepository(db)
	if err != nil {
		return nil, rf, err
	}

	svc := NewService(db)
	if err != nil {
		return nil, rf, err
	}

	msgbs, err := NewMessageBus()
	if err != nil {
		return nil, rf, err
	}

	lgr, lf, err := NewLogger()
	if err != nil {
		f := func() error {
			err := rf()
			if err != nil {
				return err
			}

			return lf()
		}
		return nil, f, err
	}

	regi = Registry{
		svc:   svc,
		repo:  repo,
		lgr:   lgr,
		msgbs: msgbs,
	}

	return &regi, nil, nil
}

func (r Registry) Service() Service {
	return r.svc
}

func (r Registry) Logger() Logger {
	return r.lgr
}

func (r Registry) Repository() Repository {
	return r.repo
}

func (r Registry) MessageBus() MessageBus {
	return r.msgbs
}
