package config

func init() {
	initApp()
	initRouter()
	initRDS()
	initSentry(App.Env)
}
