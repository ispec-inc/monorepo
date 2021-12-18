package resolver

import (
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type Recording struct {
	recording recording.Recording
}

func NewRecording(
	recording recording.Recording,
) (*Recording, error) {
	if !recording.IsSigned() {
		svc := registry.Get().Service().NewStorageService()
		signed, err := svc.GetSignedURL(recording.RawURL)
		if err != nil {
			return nil, err
		}
		err = recording.Sign(*signed)
		if err != nil {
			return nil, err
		}
	}

	return &Recording{
		recording: recording,
	}, nil
}

func (r Recording) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", r.recording.ID))
}

func (r Recording) Time() RecordingTime {
	return RecordingTime{
		hour:    r.recording.Time.Hour,
		min:     r.recording.Time.Min,
		secound: r.recording.Time.Secound,
	}
}

func (r Recording) ThumbnailURL() string {
	return string(r.recording.SignedURL.ThumbnailURL)
}

func (r Recording) URL() string {
	return string(r.recording.SignedURL.URL)
}

func (r Recording) TranscriptURL() string {
	return string(r.recording.SignedURL.TranscriptURL)
}

type RecordingTime struct {
	hour    uint
	min     uint
	secound uint
}

func (r RecordingTime) Hour() int32 {
	return int32(r.hour)
}

func (r RecordingTime) Min() int32 {
	return int32(r.min)
}

func (r RecordingTime) Secound() int32 {
	return int32(r.secound)
}
