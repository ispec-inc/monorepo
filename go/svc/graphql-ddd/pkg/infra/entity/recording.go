package entity

import (
	"time"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
)

const (
	RecordingModelName = "Recording"
	RecordingTableName = "recordings"
)

type Recording struct {
	ID              int64           `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	CallID          int64           `gorm:"column:call_id;type:bigint;"`
	RecordingDetail RecordingDetail `gorm:"foreignKey:RecordingID;references:ID"`
	S3RecordingURL  S3RecordingURL  `gorm:"foreignKey:RecordingID;references:ID"`
	CreatedAt       time.Time       `gorm:"column:created_at;type:datetime;"`
	UpdatedAt       time.Time       `gorm:"column:updated_at;type:datetime;"`
}

func (r Recording) ToModel() recording.Recording {
	return recording.Recording{
		ID: recording.ID(r.ID),
		Time: recording.RecordingTime{
			Hour:    uint(r.RecordingDetail.Hour),
			Min:     uint(r.RecordingDetail.Min),
			Secound: uint(r.RecordingDetail.Secound),
		},
		RawURL: recording.RawURL{
			ThumbnailURL:  r.S3RecordingURL.ThunmbnailURL,
			URL:           r.S3RecordingURL.URL,
			TranscriptURL: r.S3RecordingURL.TranscriptURL,
		},
	}
}
