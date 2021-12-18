package call

import (
	"errors"
	"time"

	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/team"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/value"
)

var (
	ErrParticipantUserIDListIsNotLoaded = errors.New("call: participant user id list is not loaded")
	ErrBrawsableTeamIDListIsNotLoaded   = errors.New("call: brawsable team id list is not loaded")
	ErrBrawsableTeamAlreadyExist        = errors.New("call: brawsable team already exist")
	ErrBeforeCallStatusAlreayExist      = errors.New("call: bevore call status already exist")
)

type (
	Call struct {
		ID                    ID
		Title                 Title
		CallStatus            CallStatus
		MeetingPlatform       MeetingPlatform
		HostUserID            user.ID
		ParticipantUserIDList []user.ID
		RecordingID           recording.ID
		BrawsableTeamIDList   value.IDList

		StartedAt        time.Time
		beforeCallStatus *CallStatus
	}

	ID int64
)

func GetCall(
	id ID,
	title Title,
	status CallStatus,
	hostID user.ID,
	recordingID recording.ID,
	participantIDList []user.ID,
	startedAt time.Time,
) Call {
	return Call{
		ID:                    id,
		Title:                 title,
		CallStatus:            status,
		HostUserID:            hostID,
		RecordingID:           recordingID,
		ParticipantUserIDList: participantIDList,
		StartedAt:             startedAt,
	}
}

func StartCall(
	title Title,
	participantUserList []user.User,
	startedAt time.Time,
) *Call {
	promoter := ElectHost(participantUserList)
	pids := make([]user.ID, len(participantUserList))
	for i := range participantUserList {
		pids[i] = participantUserList[i].ID
	}

	return &Call{
		Title:                 title,
		CallStatus:            CallStatusStarted,
		HostUserID:            promoter.ID,
		ParticipantUserIDList: pids,
		StartedAt:             startedAt,
		BrawsableTeamIDList:   value.IDList{promoter.DefaultTeamID},
	}

}

func (r *Call) Save(
	recording recording.Recording,
) error {
	if r.beforeCallStatus != nil {
		return ErrBeforeCallStatusAlreayExist
	}
	s := r.CallStatus
	r.RecordingID = recording.ID
	r.beforeCallStatus = &s
	r.CallStatus = CallStatusSaved

	return nil
}

func (r *Call) AddBrawsableTeam(t team.Team) error {
	if r.BrawsableTeamIDList == nil {
		return apperror.WithCode(apperror.CodeInvalid, ErrBrawsableTeamIDListIsNotLoaded)
	}
	_, exist := r.BrawsableTeamIDList.Exist(t.ID)
	if exist {
		return apperror.WithCode(apperror.CodeInvalid, ErrBrawsableTeamAlreadyExist)
	}

	r.BrawsableTeamIDList = append(r.BrawsableTeamIDList, t.ID)

	return nil
}

func (r *Call) RemoveBrawsableTeam(t team.Team) error {
	if r.BrawsableTeamIDList == nil {
		return ErrBrawsableTeamIDListIsNotLoaded
	}

	if err := r.BrawsableTeamIDList.Remove(t.ID); err != nil {
		return err
	}
	return nil
}
