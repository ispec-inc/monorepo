package invitation

type invitationCodeResponse struct {
	ID             int64  `json:"id"`
	UserID         int64  `json:"user_id"`
	InvitationCode string `json:"invitation_code"`
}

type findCodeResponse invitationCodeResponse

type addCodeResponse invitationCodeResponse
