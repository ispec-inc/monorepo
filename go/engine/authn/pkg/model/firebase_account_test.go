package model

import (
	"testing"
	"time"

	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/database"
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/entity"
	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	"github.com/stretchr/testify/assert"
)

func TestFirebaseAccountModel_FindByFirebaseServiceID(t *testing.T) {
	type (
		give struct {
			firebaseServiceID string
		}
		want struct {
			id int64
		}
	)
	tests := []struct {
		name string
		give give
		want want
		err  bool
	}{
		{
			name: "success",
			give: give{firebaseServiceID: "test1"},
			want: want{id: int64(1)},
			err:  false,
		},
		{
			name: "not found",
			give: give{firebaseServiceID: "test2"},
			want: want{id: int64(0)},
			err:  false,
		},
	}

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "firebase_account_model_find_by_firebase_service_id", []interface{}{
		&entity.FirebaseAccount{
			ID: int64(1),
			FirebaseAccountDetail: entity.FirebaseAccountDetail{
				ID:                int64(1),
				FirebaseAccountID: int64(1),
				FirebaseServiceID: "test1",
				CreatedAt:         time.Now(),
				UpdatedAt:         time.Now(),
			},
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			fa := &FirebaseAccount{}
			err := fa.FindByFirebaseServiceID(tt.give.firebaseServiceID)
			assert.Equal(t, tt.err, err != nil)
			assert.Equal(t, tt.want.id, fa.ID)
		})
	}
}

func TestFirebaseAccountModel_FindByUserID(t *testing.T) {
	type (
		give struct {
			userID int64
		}
		want struct {
			id int64
		}
	)
	tests := []struct {
		name string
		give give
		want want
		err  bool
	}{
		{
			name: "success",
			give: give{userID: int64(1)},
			want: want{id: int64(1)},
			err:  false,
		},
		{
			name: "not found",
			give: give{userID: int64(2)},
			want: want{id: int64(0)},
			err:  false,
		},
	}

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "firebase_account_model_find_by_user_id", []interface{}{
		&entity.FirebaseAccount{
			ID: int64(1),
			FirebaseAccountUser: entity.FirebaseAccountUser{
				ID:                int64(1),
				FirebaseAccountID: int64(1),
				UserID:            int64(1),
				CreatedAt:         time.Now(),
				UpdatedAt:         time.Now(),
			},
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			fa := &FirebaseAccount{}
			err := fa.FindByUserID(tt.give.userID)
			assert.Equal(t, tt.err, err != nil)
			assert.Equal(t, tt.want.id, fa.ID)
		})
	}
}

func TestFirebaseAccountModel_Create(t *testing.T) {
	type (
		give struct {
			model *FirebaseAccount
		}
		want struct {
			changedCount int
		}
	)
	tests := []struct {
		name string
		give give
		want want
		err  bool
	}{
		{
			name: "success",
			give: give{model: NewFirebaseAccount(int64(1), "test")},
			want: want{changedCount: 1},
			err:  false,
		},
	}

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "firebase_account_model_create", []interface{}{})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			bcnt := testool.CountRecord(t, db, entity.FirebaseAccountTableName)
			err := tt.give.model.Create()
			acnt := testool.CountRecord(t, db, entity.FirebaseAccountTableName)
			assert.Equal(t, tt.err, err != nil)
			assert.Equal(t, tt.want.changedCount, acnt-bcnt)
		})
	}
}
