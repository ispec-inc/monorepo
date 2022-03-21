package article

import (
	"github.com/google/uuid"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
)

type (
	Article struct {
		ID      ID
		UserID  user.ID
		Title   Title
		Content Content
	}

	ID      string
	Title   string
	Content string
)

func Post(
	title Title,
	content Content,
	usr user.User,
) (Article, error) {
	id, err := uuid.NewRandom()
	if err != nil {
		return Article{}, err
	}

	if err := title.Validate(); err != nil {
		return Article{}, err
	}

	if err := content.Validate(); err != nil {
		return Article{}, err
	}

	return Article{
		ID:      ID(id.String()),
		UserID:  usr.ID,
		Title:   title,
		Content: content,
	}, nil
}

func (t Title) Validate() error {
	if t == "" {
		return ErrTitleIsEmpty
	}

	return nil
}

func (c Content) Validate() error {
	if c == "" {
		return ErrContentIsEmpty
	}

	return nil
}
