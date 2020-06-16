package invitation

type InvitationCodeResponse struct {
	ID             int64  `json:"id"`
	InvitationCode string `json:"invitation_code"`
}
