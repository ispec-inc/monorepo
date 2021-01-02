package config

import (
	"fmt"

	"github.com/caarlos0/env/v6"
)

func Init() {
	if err := env.Parse(&Router); err != nil {
		fmt.Printf("%+v\n", err)
	}
	if err := env.Parse(&RDS); err != nil {
		fmt.Printf("%+v\n", err)
	}
}
