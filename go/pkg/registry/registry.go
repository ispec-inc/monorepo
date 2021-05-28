package registry

type Registry struct {
	lgr   Logger
	msgbs MessageBus
}

func New() (Registry, func() error, error) {
	lgr, clnup, err := NewLogger()
	if err != nil {
		return Registry{}, nil, err
	}
	bs, err := NewMessageBus()
	if err != nil {
		return Registry{}, nil, err
	}

	return Registry{
		lgr:   lgr,
		msgbs: bs,
	}, clnup, nil
}

func (r Registry) Logger() Logger {
	return r.lgr
}

func (r Registry) MessageBus() MessageBus {
	return r.msgbs
}
