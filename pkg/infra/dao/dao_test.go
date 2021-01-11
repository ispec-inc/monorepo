package dao

import (
	"os"
	"testing"

	"github.com/tanimutomo/sqlfile"
	"gorm.io/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

var (
	db *gorm.DB
)

func TestMain(m *testing.M) {
	d, err := mysql.Init()
	if err != nil {
		panic(err)
	}
	db = d

	os.Exit(m.Run())
}

func prepareTestData(filepath string) error {
	s := sqlfile.New()
	if err := s.Files("./testdata/delete.sql", filepath); err != nil {
		return err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return err
	}

	if _, err := s.Exec(sqlDB); err != nil {
		return err
	}
	return nil
}
