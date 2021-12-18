package recording

import (
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type GetSeekThumbnailUseCase struct {
	log applog.AppLog
	svc recording.SeekThumbnailService
}

type GetSeekThumbnailInput struct {
	RecordingID recording.ID
	Time        recording.RecordingTime
}

type GetSeekThumbnailOutput struct {
	SeekThumbnail recording.RecordingSeekThumbnail
}

func NewGetSeekThumbnailUseCase(rgst registry.Registry) GetSeekThumbnailUseCase {
	return GetSeekThumbnailUseCase{
		log: applog.New(rgst.Logger().New()),
		svc: rgst.Service().NewSeekThumbnailService(),
	}
}

func (g GetSeekThumbnailUseCase) Do(ipt GetSeekThumbnailInput) (*GetSeekThumbnailOutput, error) {
	s, err := g.svc.Get(ipt.RecordingID, ipt.Time)
	if err != nil {
		return nil, err
	}

	return &GetSeekThumbnailOutput{
		SeekThumbnail: s,
	}, nil
}
