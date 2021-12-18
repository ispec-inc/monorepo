package call

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/value"

const (
	ZoomMeetingPlatformID value.ID = iota + 1
	GoogleMeetMeetingPlatformID
	MicrosoftTeamsMeetingPlatformID

	ZoomMeetingPlatformName           = "zoom"
	GoogleMeetMeetingPlatformName     = "google_meet"
	MicrosoftTeamsMeetingPlatformName = "microsoft_teams"
)

type MeetingPlatform struct {
	ID   value.ID
	Name string
}

func NewZoomMeetingPlatform() *MeetingPlatform {
	return &MeetingPlatform{
		ID:   ZoomMeetingPlatformID,
		Name: ZoomMeetingPlatformName,
	}
}

func NewGoogleMeetMeetingPlatform() *MeetingPlatform {
	return &MeetingPlatform{
		ID:   GoogleMeetMeetingPlatformID,
		Name: GoogleMeetMeetingPlatformName,
	}
}

func NewMicrosoftTeasMeetingPlatform() *MeetingPlatform {
	return &MeetingPlatform{
		ID:   MicrosoftTeamsMeetingPlatformID,
		Name: MicrosoftTeamsMeetingPlatformName,
	}
}
