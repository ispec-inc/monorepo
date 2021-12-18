package resolver

import (
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type RecordingSeekThumbnail struct {
	seek recording.RecordingSeekThumbnail
}

func NewRecordingSeekThumbnail(
	seek recording.RecordingSeekThumbnail,
) (*RecordingSeekThumbnail, error) {
	if !seek.IsSigned() {
		svc := registry.Get().Service().NewStorageService()
		signed, err := svc.GetSignedSeekThumbnailURL(seek.RawURL)
		if err != nil {
			return nil, err
		}

		err = seek.Sign(*signed)
		if err != nil {
			return nil, err
		}
	}

	return &RecordingSeekThumbnail{seek: seek}, nil
}

func (r RecordingSeekThumbnail) RecordingID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", r.seek.RecordingID))
}

func (r RecordingSeekThumbnail) Time() RecordingTime {
	return RecordingTime{
		hour:    r.seek.Time.Hour,
		min:     r.seek.Time.Min,
		secound: r.seek.Time.Secound,
	}
}

func (r RecordingSeekThumbnail) URL() string {
	return string(*r.seek.SignedURL)
}
