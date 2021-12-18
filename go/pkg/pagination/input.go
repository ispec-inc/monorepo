package pagination

import "errors"

type Input struct {
	First  *int32
	After  *string
	Last   *int32
	Before *string
}

func (i Input) Validate() error {
	if i.First == nil && i.Last == nil {
		return errors.New("first or last is required")
	}
	if i.First != nil && i.Last != nil {
		return errors.New("passing first and last is not supported")
	}
	if i.Before != nil && i.After != nil {
		return errors.New("passing before and after is not supported")
	}
	return nil
}
