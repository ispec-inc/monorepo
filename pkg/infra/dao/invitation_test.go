package dao

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/entity"
	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
	"github.com/ispec-inc/go-distributed-monolith/pkg/presenter"
)

func Test(t *testing.T) {
	config.Init()

	db, cleanup, err := mysql.Init()
	if err != nil {
		panic(err)
	}
	defer cleanup()

	db.AutoMigrate(entity.Invitation{})

	// seed data
	invitation := entity.Invitation{
		ID:     int64(1),
		UserID: int64(1),
		Code:   "invitation-code",
	}
	db.Save(&invitation)

	repo := NewInvitation(db)
	test := NewTestInvitation(t, repo)
	test.FindSuccess()

	db.Delete(&invitation)
}

type testInvitation struct {
	t *testing.T
	r Invitation
}

func NewTestInvitation(t *testing.T, r Invitation) testInvitation {
	t.Helper()
	return testInvitation{t, r}
}

func (t testInvitation) FindSuccess() {
	output, err := t.r.Find(int64(1))
	if err != nil {
		t.t.Errorf(
			"Error: code: %d, message: %s",
			presenter.CodeStatuses[err.Code()], err.Message(),
		)
	}
	assert.IsType(t.t, model.Invitation{}, output)
	assert.Exactly(t.t, int64(1), output.ID)
	assert.Exactly(t.t, "invitation-code", output.Code)
}
