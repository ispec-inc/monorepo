package dao

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/entity"
	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

func Test(t *testing.T) {
	config.LoadEnv(".env.test")
	db, err := mysql.NewDB()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	db.AutoMigrate(entity.Invitation{})

	tx := db.Begin()
	defer tx.Rollback()

	// seed data
	tx.Save(&entity.Invitation{
		ID:     1,
		UserID: int64(1),
		Code:   "invitation-code",
	})

	repo := NewInvitation(tx)

	test := NewTest(t, repo)
	test.FindSuccess()
}

type test struct {
	t *testing.T
	r Invitation
}

func NewTest(t *testing.T, r Invitation) test {
	t.Helper()
	return test{t, r}
}

func (t test) FindSuccess() {
	output, err := t.r.Find(int64(1))
	if err != nil {
		t.t.Errorf(
			"Error: %s",
			err.Error(),
		)
	}
	assert.IsType(t.t, model.Invitation{}, output)
	assert.Exactly(t.t, int64(1), output.ID)
	assert.Exactly(t.t, "invitation-code", output.Code)
}
