package invitation

import (
	"testing"

	gomock "github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/mock"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/presenter"
)

func Test(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mock := mock.NewMockInvitation(ctrl)
	mock.EXPECT().Find(int64(1)).Return(
		model.Invitation{ID: int64(1), Code: "invitation-code"},
		nil,
	)

	usecase := Usecase{mock}

	test := NewTest(t, usecase)
	test.FindCodeSuccess()
}

type test struct {
	t *testing.T
	u Usecase
}

func NewTest(t *testing.T, u Usecase) test {
	t.Helper()
	return test{t, u}
}

func (t test) FindCodeSuccess() {
	output, err := t.u.FindCode(FindCodeInput{ID: int64(1)})
	if err != nil {
		t.t.Errorf(
			"Error: code: %d, message: %s",
			presenter.CodeStatuses[err.Code()], err.Message(),
		)
	}
	assert.IsType(t.t, FindCodeOutput{}, output)
	assert.Exactly(t.t, int64(1), output.ID)
	assert.Exactly(t.t, "invitation-code", output.Code)
}
