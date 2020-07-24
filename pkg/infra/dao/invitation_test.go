package dao

import (
	"database/sql"
	"fmt"
	"os"
	"testing"

	"github.com/go-testfixtures/testfixtures/v3"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

var (
	dao   Invitation
	sqlDB *sql.DB
)

func TestMain(m *testing.M) {
	config.Init()

	db, cleanup, err := mysql.Init()
	if err != nil {
		panic(err)
	}
	defer cleanup()

	dao = NewInvitation(db)

	sqlDB, err = sql.Open(
		config.RDS.MS,
		fmt.Sprintf(
			"%s:%s@(%s:%s)/%s?charset=utf8mb4&parseTime=true",
			config.RDS.User, config.RDS.Password,
			config.RDS.Host, config.RDS.Port,
			config.RDS.Database,
		),
	)
	if err != nil {
		panic(err)
	}

	prepareTestData()
	os.Exit(m.Run())
}

func prepareTestData() {
	fixtures, err := testfixtures.New(
		testfixtures.Database(sqlDB),
		testfixtures.Dialect(config.RDS.MS),
		testfixtures.Directory("testdata/invitation"),
	)
	if err != nil {
		panic(err)
	}

	if err := fixtures.Load(); err != nil {
		panic(err)
	}
}

func TestInvitationDao_Find_Success(t *testing.T) {
	t.Helper()

	output, aerr := dao.Find(int64(1))
	assert.Exactly(t, nil, aerr)
	assert.Exactly(t, int64(1), output.ID)
	assert.Exactly(t, "code", output.Code)
}

func TestInvitationDao_Fail_NotFound(t *testing.T) {
	t.Helper()

	_, aerr := dao.Find(int64(2))
	assert.Exactly(t, apperror.CodeNotFound, aerr.Code())
}

func TestInvitationDao_Create_Success(t *testing.T) {
	t.Helper()

	output, aerr := dao.Create(
		model.Invitation{
			UserID: int64(2),
			Code:   "code",
		},
	)
	assert.Exactly(t, nil, aerr)
	assert.Exactly(t, int64(2), output.UserID)
	assert.Exactly(t, "code", output.Code)
}

func TestInvitationDao_Create_Fail_AlreadyExist(t *testing.T) {
	t.Helper()

	_, aerr := dao.Create(
		model.Invitation{
			UserID: int64(1),
			Code:   "code",
		},
	)
	assert.Exactly(t, apperror.CodeInvalid, aerr.Code())
}
