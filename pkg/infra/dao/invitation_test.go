package dao

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

func TestInvitationDao_Find_Success(t *testing.T) {
	t.Helper()
	if err := prepareTestData("./testdata/invitation/find_success.sql"); err != nil {
		t.Error(err)
	}
	i := NewInvitation(DB)

	output, aerr := i.Find(int64(1))
	assert.Exactly(t, nil, aerr)
	assert.Exactly(t, int64(1), output.ID)
	assert.Exactly(t, "code", output.Code)
}

func TestInvitationDao_Find_Fail_NotFound(t *testing.T) {
	t.Helper()
	if err := prepareTestData("./testdata/invitation/find_fail_not_found.sql"); err != nil {
		t.Error(err)
	}
	i := NewInvitation(DB)

	_, aerr := i.Find(int64(1))
	assert.Exactly(t, apperror.CodeNotFound, aerr.Code())
}

func TestInvitationDao_FindByUserID_Success(t *testing.T) {
	t.Helper()
	if err := prepareTestData("./testdata/invitation/find_by_user_id_success.sql"); err != nil {
		t.Error(err)
	}
	i := NewInvitation(DB)

	output, aerr := i.FindByUserID(int64(1))
	assert.Exactly(t, nil, aerr)
	assert.Exactly(t, int64(1), output.ID)
	assert.Exactly(t, "code", output.Code)
}

func TestInvitationDao_FindByUserID_Fail_NotFound(t *testing.T) {
	t.Helper()
	if err := prepareTestData("./testdata/invitation/find_by_user_id_fail_not_found.sql"); err != nil {
		t.Error(err)
	}
	i := NewInvitation(DB)

	_, aerr := i.FindByUserID(int64(1))
	assert.Exactly(t, apperror.CodeNotFound, aerr.Code())
}

func TestInvitationDao_Create_Success(t *testing.T) {
	t.Helper()
	if err := prepareTestData("./testdata/invitation/create_success.sql"); err != nil {
		t.Error(err)
	}
	i := NewInvitation(DB)

	aerr := i.Create(
		model.Invitation{
			UserID: int64(1),
			Code:   "code",
		},
	)
	assert.Exactly(t, nil, aerr)
}

func TestInvitationDao_Create_Fail_AlreadyExist(t *testing.T) {
	t.Helper()
	if err := prepareTestData("./testdata/invitation/create_fail_already_exist.sql"); err != nil {
		t.Error(err)
	}
	i := NewInvitation(DB)

	aerr := i.Create(
		model.Invitation{
			UserID: int64(1),
			Code:   "code",
		},
	)
	assert.Exactly(t, apperror.CodeInvalid, aerr.Code())
}
