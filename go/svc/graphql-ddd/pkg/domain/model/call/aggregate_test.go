package call

import (
	"testing"
	"time"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/team"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/stretchr/testify/assert"
)

func TestCall_AddBrawsableTeam(t *testing.T) {

	type (
		give struct {
			brawsable team.Team
			team      team.Team
		}
		want struct {
			err bool
		}
	)

	tests := []struct {
		name string
		give give
		want want
	}{
		{
			name: "Call_AddBrawsableTeam_Success",
			give: give{
				brawsable: team.Team{
					ID: 1,
				},
				team: team.Team{
					ID: 2,
				},
			},
			want: want{
				err: false,
			},
		},
		{
			name: "Call_AddBrawsableTeam_Failed",
			give: give{
				brawsable: team.Team{
					ID: 1,
				},
				team: team.Team{
					ID: 1,
				},
			},
			want: want{
				err: true,
			},
		},
	}

	for i := range tests {
		tt := tests[i]
		t.Run(tt.name, func(t *testing.T) {
			r := StartCall(
				"title",
				[]user.User{
					{
						ID:            1,
						DefaultTeamID: tt.give.brawsable.ID,
					},
				},
				time.Now(),
			)
			err := r.AddBrawsableTeam(tt.give.team)
			if tt.want.err {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}
