package entity

import "time"

const (
	S3RecordingURLModelName = "S3RecordingUrl"
	S3RecordingURLTableName = "s3_recording_urls"
)

type S3RecordingURL struct {
	ID            int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	RecordingID   int64     `gorm:"column:recording_id;type:bigint;"`
	URL           string    `gorm:"column:url;type:varchar;size:255;"`
	ThunmbnailURL string    `gorm:"column:thunmbnail_url;type:varchar;size:255;"`
	TranscriptURL string    `gorm:"column:transcript_url;type:varchar;size:255;"`
	CreatedAt     time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt     time.Time `gorm:"column:updated_at;type:datetime;"`
}
