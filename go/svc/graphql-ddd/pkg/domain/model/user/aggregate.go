package user

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/value"

type (
	User struct {
		ID            ID
		Name          string
		DefaultTeamID value.ID
		Privilege     Privilege
		Icon          Icon
	}
)

type ID int64

type UserList []User

func (ul UserList) ToMap() map[ID]User {
	data := make(map[ID]User)

	for _, u := range ul {
		data[u.ID] = u
	}

	return data
}
