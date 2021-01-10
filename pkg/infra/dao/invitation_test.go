package dao

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/entity"
)

func TestInvitationDao_Find(t *testing.T) {
	t.Helper()
	d := NewInvitation(db)

	cases := []struct {
		name string
		id   int64
		want int64
		err  bool
	}{
		{
			name: "Found",
			id:   int64(1),
			want: int64(1),
			err:  false,
		},
		{
			name: "NotFound",
			id:   int64(2),
			want: int64(0),
			err:  true,
		},
	}
	for i := range cases {
		tc := cases[i]
		t.Run(tc.name, func(t *testing.T) {
			if err := prepareTestData("./testdata/invitation/find.sql"); err != nil {
				t.Error(err)
			}

			opt, aerr := d.Find(tc.id)

			assert.Exactly(t, tc.want, opt.ID)
			if tc.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
			}
		})
	}
}

func TestInvitationDao_FindByUserID(t *testing.T) {
	t.Helper()
	d := NewInvitation(db)

	cases := []struct {
		name   string
		userID int64
		want   int64
		err    bool
	}{
		{
			name:   "Found",
			userID: int64(1),
			want:   int64(1),
			err:    false,
		},
		{
			name:   "NotFound",
			userID: int64(2),
			want:   int64(0),
			err:    true,
		},
	}
	for i := range cases {
		tc := cases[i]
		t.Run(tc.name, func(t *testing.T) {
			if err := prepareTestData("./testdata/invitation/find_by_user_id.sql"); err != nil {
				t.Error(err)
			}

			opt, aerr := d.FindByUserID(tc.userID)

			assert.Exactly(t, tc.want, opt.UserID)
			if tc.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
			}
		})
	}
}

func TestInvitationDao_Create(t *testing.T) {
	t.Helper()
	d := NewInvitation(db)

	cases := []struct {
		name       string
		model      model.Invitation
		createdCnt int
		err        bool
	}{
		{
			name:       "Created",
			model:      model.Invitation{UserID: int64(2), Code: "code"},
			createdCnt: 1,
			err:        false,
		},
		{
			name:       "AlreadyExist",
			model:      model.Invitation{UserID: int64(1), Code: "code"},
			createdCnt: 0,
			err:        true,
		},
	}
	for i := range cases {
		tc := cases[i]
		t.Run(tc.name, func(t *testing.T) {
			if err := prepareTestData("./testdata/invitation/create.sql"); err != nil {
				t.Error(err)
			}

			var before, after []entity.Invitation

			d.db.Find(&before)

			aerr := d.Create(tc.model)

			d.db.Find(&after)

			assert.Exactly(t, tc.createdCnt, len(after)-len(before))
			if tc.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
			}
		})
	}
}
