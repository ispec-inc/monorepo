package seed

import (
	"time"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
)

func PrepareDev() []interface{} {
	seeds := []interface{}{
		&entity.Call{
			ID: 1,
		},
		&entity.Call{
			ID: 2,
		},
		&entity.CallDetail{
			ID:        1,
			CallID:    1,
			Title:     "title1",
			StartedAt: time.Now().AddDate(0, -10, 0),
		},
		&entity.CallDetail{
			ID:        2,
			CallID:    2,
			Title:     "title2",
			StartedAt: time.Now().AddDate(0, -5, 0),
		},
		&entity.Recording{
			ID:     1,
			CallID: 1,
		},
		&entity.Recording{
			ID:     2,
			CallID: 2,
		},
		&entity.RecordingDetail{
			ID:          1,
			RecordingID: 1,
			Hour:        1,
			Min:         2,
			Secound:     3,
		},
		&entity.RecordingDetail{
			ID:          2,
			RecordingID: 2,
			Hour:        0,
			Min:         58,
			Secound:     3,
		},
		&entity.S3RecordingURL{
			ID:            1,
			RecordingID:   1,
			URL:           "https://s3.ap-northeast-1.amazonaws.com/dev.ispec-sample.s3-bucket/pj-empath/video/video.m3u8",
			ThunmbnailURL: "https://s3.ap-northeast-1.amazonaws.com/dev.ispec-sample.s3-bucket/pj-empath/thumbnail/sample-1.jpg",
			TranscriptURL: "https://s3.ap-northeast-1.amazonaws.com/dev.ispec-sample.s3-bucket/pj-empath/transcript/transcript.json",
		},
		&entity.S3RecordingURL{
			ID:            2,
			RecordingID:   2,
			URL:           "https://s3.ap-northeast-1.amazonaws.com/dev.ispec-sample.s3-bucket/pj-empath/video/video.m3u8",
			ThunmbnailURL: "https://s3.ap-northeast-1.amazonaws.com/dev.ispec-sample.s3-bucket/pj-empath/thumbnail/sample-2.jpg",
			TranscriptURL: "https://s3.ap-northeast-1.amazonaws.com/dev.ispec-sample.s3-bucket/pj-empath/transcript/transcript.json",
		},
		&entity.User{
			ID: 1,
		},
		&entity.User{
			ID: 2,
		},
		&entity.CallHost{
			ID:     1,
			CallID: 1,
			UserID: 1,
		},
		&entity.CallHost{
			ID:     2,
			CallID: 2,
			UserID: 2,
		},
		&entity.CallParticipant{
			ID:     1,
			CallID: 1,
			UserID: 1,
		},
		&entity.CallParticipant{
			ID:     2,
			CallID: 1,
			UserID: 2,
		},
		&entity.CallParticipant{
			ID:     3,
			CallID: 2,
			UserID: 2,
		},
		&entity.UserDetail{
			ID:        1,
			UserID:    1,
			IconURL:   "https://ca.slack-edge.com/T7MDL1XJA-UGGCBUN94-6fd4cbdb8149-512",
			Name:      "Yusuke Yamada",
			Privilege: user.Admin.ID,
		},
		&entity.UserDetail{
			ID:        2,
			UserID:    2,
			IconURL:   "https://ca.slack-edge.com/T7MDL1XJA-U01KV8K4CSW-57ba97fffc48-512",
			Name:      "Satoshi Ninomiya",
			Privilege: user.Member.ID,
		},
		&entity.Team{
			ID: 1,
		},
		&entity.Team{
			ID: 2,
		},
		&entity.TeamUser{
			ID:     1,
			TeamID: 1,
			UserID: 1,
		},
		&entity.TeamUser{
			ID:     2,
			TeamID: 2,
			UserID: 1,
		},
		&entity.TeamUser{
			ID:     3,
			TeamID: 2,
			UserID: 2,
		},
		&entity.CallBrawsableTeam{
			ID:     1,
			TeamID: 1,
			CallID: 1,
		},
		&entity.CallBrawsableTeam{
			ID:     2,
			TeamID: 2,
			CallID: 1,
		},
		&entity.CallBrawsableTeam{
			ID:     3,
			TeamID: 1,
			CallID: 2,
		},
		&entity.Company{
			ID: 1,
		},
		&entity.CompanyDetail{
			ID:        1,
			CompanyID: 1,
			Name:      "ispec inc",
			IconURL:   "https://assets.st-note.com/production/uploads/images/17864955/rectangle_large_type_2_3030999d57ef134b1b0a1ffee1b53881.jpeg?width=800",
		},
		&entity.UserCompany{
			ID:        1,
			CompanyID: 1,
			UserID:    1,
		},
	}

	return seeds
}
