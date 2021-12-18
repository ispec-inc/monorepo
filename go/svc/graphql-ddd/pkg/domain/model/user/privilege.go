package user

const (
	AdminPrivilegeName  = "admin"
	ViewerPrivilegeName = "listener"
	MemberPrivilegeName = "member"
)

type Privilege struct {
	ID                  int
	Name                string
	IsEditableCompany   bool
	IsRecordableMeeting bool
}

var Admin = Privilege{
	ID:                  1,
	Name:                AdminPrivilegeName,
	IsEditableCompany:   true,
	IsRecordableMeeting: true,
}

var Viewer = Privilege{
	ID:                  2,
	Name:                ViewerPrivilegeName,
	IsEditableCompany:   false,
	IsRecordableMeeting: false,
}

var Member = Privilege{
	ID:                  3,
	Name:                MemberPrivilegeName,
	IsEditableCompany:   false,
	IsRecordableMeeting: true,
}

func FindPrivilege(id int) Privilege {
	table := map[int]Privilege{
		1: Admin,
		2: Viewer,
		3: Member,
	}
	return table[id]
}
