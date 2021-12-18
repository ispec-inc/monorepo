package resolver

import (
	"context"
	"fmt"
	"time"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/loader"
)

type Call struct {
	call call.Call
}

func NewCall(
	call call.Call,
) *Call {
	return &Call{
		call: call,
	}
}

func (c Call) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", c.call.ID))
}

func (c Call) Title() string {
	return string(c.call.Title)
}

func (c Call) Recording(ctx context.Context) (Recording, error) {
	r, err := loader.LoadRecording(ctx, c.call.RecordingID)
	if err != nil {
		return Recording{}, err
	}

	rslv, err := NewRecording(*r)
	if err != nil {
		return Recording{}, err
	}
	return *rslv, nil
}

func (c Call) StartedAt(ctx context.Context) string {
	return c.call.StartedAt.Format(time.RFC3339)
}

func (c Call) Host(ctx context.Context) (User, error) {
	usr, err := loader.LoadUser(ctx, c.call.HostUserID)
	if err != nil {
		return User{}, err
	}

	rslv := NewUser(*usr)

	return *rslv, nil
}

func (c Call) Participants(ctx context.Context) ([]User, error) {
	result, err := loader.LoadUsers(ctx, c.call.ParticipantUserIDList)
	if err != nil {
		return []User{}, err
	}

	users := make([]User, len(result))
	for i := range result {
		r := result[i]
		if r.Error != nil {
			return []User{}, r.Error
		}
		rslv := NewUser(r.User)
		users[i] = *rslv
	}

	return users, nil
}
