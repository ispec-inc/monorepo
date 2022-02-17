package setting

type (
	Sentry struct {
		DSN         string `yaml:"dsn"`
		Environment string `yaml:"environment"`
		Debug       string `yaml:"debug"`
	}
)
