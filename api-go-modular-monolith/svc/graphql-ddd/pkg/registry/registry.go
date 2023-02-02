package registry

type Registry struct {
	repo Repository
	lgr  Logger
}

func New() (Registry, func() error, error) {
	repo, clnup, err := NewRepository()
	if err != nil {
		return Registry{}, clnup, err
	}

	lgr, clnup, err := NewLogger()
	if err != nil {
		return Registry{}, clnup, err
	}

	return Registry{
		repo: repo,
		lgr:  lgr,
	}, clnup, nil
}

func (r Registry) Logger() Logger {
	return r.lgr
}

func (r Registry) Repository() Repository {
	return r.repo
}
