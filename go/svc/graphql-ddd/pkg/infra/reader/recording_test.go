package reader

import (
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/database"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"github.com/stretchr/testify/assert"
)

func TestRecording_List(t *testing.T) {
	type (
		give struct {
			ids []recording.ID
		}
		want struct {
			count int
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "Recording_List", []interface{}{
		&entity.Recording{ID: 1},
		&entity.RecordingDetail{ID: 1, RecordingID: 1},
		&entity.Recording{ID: 2},
		&entity.RecordingDetail{ID: 2, RecordingID: 2},
		&entity.Recording{ID: 3},
		&entity.RecordingDetail{ID: 3, RecordingID: 3},
		&entity.Recording{ID: 4},
		&entity.RecordingDetail{ID: 4, RecordingID: 4},
	})
	database.Init(db)
	defer cleanup()

	tests := []struct {
		name string
		give give
		want want
	}{
		{
			give: give{
				ids: []recording.ID{1, 2, 3},
			},
			want: want{
				count: 3,
			},
		},
		{
			give: give{
				ids: []recording.ID{2, 3},
			},
			want: want{
				count: 2,
			},
		},
		{
			give: give{
				ids: []recording.ID{10},
			},
			want: want{
				count: 0,
			},
		},
	}

	for i := range tests {
		test := tests[i]
		t.Run(test.name, func(t *testing.T) {
			r := NewRecording(db)
			recordings, err := r.List(test.give.ids)
			assert.NoError(t, err)
			assert.Equal(t, test.want.count, len(*recordings))
		})
	}
}

func TestRecording_Get(t *testing.T) {
	type (
		give struct {
			id recording.ID
		}
		want struct {
			id recording.ID
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "Recording_List", []interface{}{
		&entity.Recording{ID: 1},
		&entity.RecordingDetail{ID: 1, RecordingID: 1},
		&entity.Recording{ID: 2},
		&entity.RecordingDetail{ID: 2, RecordingID: 2},
		&entity.Recording{ID: 3},
		&entity.RecordingDetail{ID: 3, RecordingID: 3},
		&entity.Recording{ID: 4},
		&entity.RecordingDetail{ID: 4, RecordingID: 4},
	})
	database.Init(db)
	defer cleanup()

	tests := []struct {
		name string
		give give
		want want
		err  bool
	}{
		{
			give: give{
				id: recording.ID(1),
			},
			want: want{
				id: recording.ID(1),
			},
		},
		{
			give: give{
				id: recording.ID(4),
			},
			want: want{
				id: recording.ID(4),
			},
		},
		{
			give: give{
				id: recording.ID(10),
			},
			want: want{
				id: recording.ID(0),
			},
			err: true,
		},
	}

	for i := range tests {
		test := tests[i]
		t.Run(test.name, func(t *testing.T) {
			r := NewRecording(db)
			rec, err := r.Get(test.give.id)
			if test.err {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
				assert.Equal(t, test.want.id, rec.ID)
			}
		})
	}
}
