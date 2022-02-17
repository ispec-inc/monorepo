package setting

type (
	Sentry struct {
		DSN         string `yaml:"dsn"`
		Environment string `yaml:"environment"`
		Debug       bool   `yaml:"debug"`
	}
)
