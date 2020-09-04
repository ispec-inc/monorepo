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
	DB *gorm.DB
)

func TestMain(m *testing.M) {
	config.Init()

	db, cleanup, err := mysql.Init()
	if err != nil {
		panic(err)
	}
	defer cleanup()
	db.LogMode(false)
	DB = db

	os.Exit(m.Run())
}

func prepareTestData(filepath string) error {
	s, err := sqlfile.Load("./testdata/delete.sql")
	if err != nil {
		return err
	}
	if _, err := s.Exec(DB.DB()); err != nil {
		return err
	}
	s, err = sqlfile.Load(filepath)
	if err != nil {
		return err
	}
	if _, err := s.Exec(DB.DB()); err != nil {
		return err
	}
	return nil
}
