# vue-apollo-in-nuxt

## Usage

```bash

# serve with hot reload at localhost:3000
$ cp .env.default .env
$ yarn run dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# install util-functions
$ yarn workspace @monorepo/util-functions update
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Setup
- Env
    - .env.defaultをPJに合わせて変更する。
- Auth Module
    - `nuxt.config.js`に、ログインのためのエンドポイントを指定する箇所があるので、プロジェクトに合わせて変更する
    - もしrefreshが必要な場合は、axiosのplugin側で以下のようなコードを追加する(必要箇所はよしなに変更してください)
        ```
        ...
        $axios.onResponseError((error) => {
          const code = parseInt(error.response && error.response.status)
          if (code === 401) {
            $axios
              .post('/api/v1/admin/refresh_tokens', {
                userName: localStorage.getItem('userName'),
                refreshToken: localStorage.getItem('refreshToken'),
              })
              .then((res) => {
                if (res.status === 200) {
                  console.log('success refresh')
                  store.$auth.setUserToken(res.data.accessToken)
                  localStorage.setItem('refreshToken', res.data.refreshToken)
                  const config = error.config
                  config.headers.Authorization = 'Bearer ' + res.data.accessToken
                  return $axios.request(error.config)
                } else {
                  console.log('failure refresh')
                  store.$auth.logout()
                  store.$router.push('login')
                }
              })
              .catch(() => {
                console.log('failure refresh')
                store.$auth.logout()
                store.$router.push('login')
              })
            return
          }
          ...
        })
        ```
- Vuex
    - Storeにサンプルのstateが入っているので、PJに合わせて変更する。
- Color Scheme
    - `nuxt.config.js`で指定しているColor SchemeをPJに合わせて変更する。
    - colorの一覧は[こちら](https://vuetifyjs.com/en/styles/colors/#material-colors)
- Logo
    - `/static`に画像を入れて`/layout`から呼んでいるので、画像をここに入れる。
