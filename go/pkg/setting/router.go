package setting

import "time"

type (
	RouterConfig struct {
		Timeout      time.Duration `yaml:"timeout"`
		AllowOrigins []string      `yaml:"allow_origins"`
	}

	Router struct {
		Admin struct {
			RouterConfig
		} `yaml:"admin"`

		Article struct {
			RouterConfig
		} `yaml:"article"`

		Graphql struct {
			RouterConfig
		} `yaml:"graphql"`

		Media struct {
			RouterConfig
		} `yaml:"media"`
	}
)
