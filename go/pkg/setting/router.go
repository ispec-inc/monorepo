package setting

import "time"

type (
	RouterConfig struct {
		Timeout      time.Duration `yaml:"timeout"`
		AllowOrigins []string      `yaml:"allow_origins"`
	}

	Router struct {
		Admin struct {
			Router RouterConfig
		} `yaml:"admin"`

		Article struct {
			Router RouterConfig
		} `yaml:"article"`

		Graphql struct {
			Router RouterConfig
		} `yaml:"graphql"`

		Media struct {
			Router RouterConfig
		} `yaml:"media"`
	}
)
