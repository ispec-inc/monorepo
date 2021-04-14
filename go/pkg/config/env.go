package config

const (
	EnvDev  Env = "development"
	EnvStg  Env = "staging"
	EnvProd Env = "production"
)

type Env string

func (e Env) String() string {
	return string(e)
}

func newEnv(e string) Env {
	switch e {
	case EnvDev.String():
		return EnvDev
	case EnvStg.String():
		return EnvStg
	case EnvProd.String():
		return EnvProd
	}
	return EnvDev
}
