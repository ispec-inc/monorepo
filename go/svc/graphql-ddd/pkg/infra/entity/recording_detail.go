package entity

import "time"

const (
	RecordingDetailModelName = "RecordingDetail"
	RecordingDetailTableName = "recording_details"
)

type RecordingDetail struct {
	ID          int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	RecordingID int64     `gorm:"column:recording_id;type:bigint;"`
	Hour        int       `gorm:"column:hour;type:int;default:0;"`
	Min         int       `gorm:"column:min;type:int;default:0;"`
	Secound     int       `gorm:"column:secound;type:int;default:0;"`
	CreatedAt   time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt   time.Time `gorm:"column:updated_at;type:datetime;"`
}
