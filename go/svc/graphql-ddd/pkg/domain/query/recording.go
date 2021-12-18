package query

import (
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
)

type Recording interface {
	Get(recording.ID) (*recording.Recording, error)
	List([]recording.ID) (*recording.RecordingList, error)
}
