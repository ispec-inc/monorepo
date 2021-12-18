package reader

import (
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/database"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"github.com/stretchr/testify/assert"
)

func TestCompany_GetByUserID(t *testing.T) {
	type (
		give struct {
			id user.ID
		}
		want struct {
			name    string
			iconURL string
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "Company_GetByUserID", []interface{}{
		&entity.User{ID: 1},
		&entity.Company{ID: 1},
		&entity.CompanyDetail{ID: 1, CompanyID: 1, Name: "ispec", IconURL: "https://ispec.world"},
		&entity.UserCompany{ID: 1, CompanyID: 1, UserID: 1},
	})
	database.Init(db)
	defer cleanup()

	test := struct {
		name string
		give give
		want want
	}{
		give: give{
			id: 1,
		},
		want: want{
			name:    "ispec",
			iconURL: "https://ispec.world",
		},
	}

	t.Run(test.name, func(t *testing.T) {
		r := NewCompany(db)
		company, err := r.GetByUserID(test.give.id)
		assert.NoError(t, err)
		assert.Equal(t, test.want.name, company.Name)
		assert.Equal(t, test.want.iconURL, string(company.IconURL))
	})
}
