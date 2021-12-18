package service

import (
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
)

type LocalSeekThumbnailService struct {
}

func NewLocalSeekThumbnailService() LocalSeekThumbnailService {
	return LocalSeekThumbnailService{}
}

func (l LocalSeekThumbnailService) Get(
	recordingID recording.ID,
	time recording.RecordingTime,
) (recording.RecordingSeekThumbnail, error) {
	return recording.RecordingSeekThumbnail{
		RecordingID: recordingID,
		Time:        time,
		RawURL:      "https://s3.ap-northeast-1.amazonaws.com/dev.ispec-sample.s3-bucket/pj-empath/thumbnail/sample-2.jpg",
	}, nil
}
