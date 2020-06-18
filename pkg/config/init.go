package config

import (
	"github.com/joho/godotenv"
)

func LoadEnv(envFile string) error {
	if envFile == "" {
		err := godotenv.Load()
		return err
	}
	err := godotenv.Load(envFile)
	return err
}
