package value

import "errors"

type ID int64

type IDList []ID

func NewID(id int64) ID {
	return ID(id)
}

func (l IDList) Exist(id ID) (index int, exist bool) {

	for i := range l {
		if l[i] == id {
			return i, true
		}
	}

	return 0, false
}

func (l *IDList) Remove(id ID) error {
	ids := *l
	for i := range ids {
		if ids[i] == id {
			*l = append(ids[:i], ids[i+1:]...)
			return nil
		}
	}

	return errors.New("id doen't exist")
}
