package setting

import "time"

type (
	RouterConfig struct {
		Timeout      time.Duration `yaml:"timeout"`
		AllowOrigins []string      `yaml:"allow_origins"`
	}

	Router struct {
		Admin   RouterConfig `yaml:"admin"`
		Article RouterConfig `yaml:"article"`
		Graphql RouterConfig `yaml:"graphql"`
		Media   RouterConfig `yaml:"media"`
	}
)
