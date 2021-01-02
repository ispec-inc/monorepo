package dao

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

func prepareTestInvitationDao(t *testing.T, path string) Invitation {
	t.Helper()
	if err := prepareTestData(path); err != nil {
		t.Error(err)
	}
	return NewInvitation(db)
}

func TestInvitationDao_Find_Success(t *testing.T) {
	i := prepareTestInvitationDao(t, "./testdata/invitation/find/success.sql")

	output, aerr := i.Find(int64(1))
	assert.Exactly(t, nil, aerr)
	assert.Exactly(t, int64(1), output.ID)
	assert.Exactly(t, "code", output.Code)
}

func TestInvitationDao_Find_Fail_NotFound(t *testing.T) {
	i := prepareTestInvitationDao(t, "./testdata/invitation/find/fail_not_found.sql")

	_, aerr := i.Find(int64(1))
	assert.Exactly(t, apperror.CodeNotFound, aerr.Code())
}

func TestInvitationDao_FindByUserID_Success(t *testing.T) {
	i := prepareTestInvitationDao(t, "./testdata/invitation/find_by_user_id/success.sql")

	output, aerr := i.FindByUserID(int64(1))
	assert.Exactly(t, nil, aerr)
	assert.Exactly(t, int64(1), output.ID)
	assert.Exactly(t, "code", output.Code)
}

func TestInvitationDao_FindByUserID_Fail_NotFound(t *testing.T) {
	i := prepareTestInvitationDao(t, "./testdata/invitation/find_by_user_id/fail_not_found.sql")

	_, aerr := i.FindByUserID(int64(1))
	assert.Exactly(t, apperror.CodeNotFound, aerr.Code())
}

func TestInvitationDao_Create_Success(t *testing.T) {
	i := prepareTestInvitationDao(t, "./testdata/invitation/create/success.sql")

	aerr := i.Create(
		model.Invitation{
			UserID: int64(1),
			Code:   "code",
		},
	)
	assert.Exactly(t, nil, aerr)
}

func TestInvitationDao_Create_Fail_AlreadyExist(t *testing.T) {
	i := prepareTestInvitationDao(t, "./testdata/invitation/create/fail_already_exist.sql")

	aerr := i.Create(
		model.Invitation{
			UserID: int64(1),
			Code:   "code",
		},
	)
	assert.Exactly(t, apperror.CodeInvalid, aerr.Code())
}
