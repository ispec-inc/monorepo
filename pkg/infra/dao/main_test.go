package dao

import (
	"os"
	"testing"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/tanimutomo/sqlfile"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

var (
	db *gorm.DB
)

func TestMain(m *testing.M) {
	config.Init()

	d, cleanup, err := mysql.Init()
	if err != nil {
		panic(err)
	}
	defer cleanup()
	d.LogMode(false)
	db = d

	os.Exit(m.Run())
}

func prepareTestData(filepath string) error {
	s := sqlfile.New()
	if err := s.Files("./testdata/delete.sql", filepath); err != nil {
		return err
	}
	if _, err := s.Exec(db.DB()); err != nil {
		return err
	}
	return nil
}
