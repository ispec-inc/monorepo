# nuxt-spa-admin

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


## Testing

### 起動方法/ファイルの置き場など
- プロジェクトルートにて以下コマンド実行で専用画面が立ち上がってテストを回せるようになる
  - `$ yarn run cypress open`

- ファイルの置き場はの以下のディレクトリ配下にテストコードを入れると勝手にロードしてくれて、テストできるようになる
  - `/cypress/integration`
  - (ディレクトリがない場合は初回`yarn run cypress open`実行時に生成してくれる)

- サポートツールのインストール
  - [Cypress Recorder - ChromeExtension](https://chrome.google.com/webstore/detail/cypress-recorder/glcapdcacdfkokcmicllhcjigeodacab)
  - Chrome拡張として、自分のブラウザでの行動をレコードしてくれるものがある。そのままテスト実行などは出来ないが、コードを記述する手間を大分削減でき、あとから痒いところは編集できるので使っていくのがよさそう

### テスト作成のルーティーン
- 3ステップでテストを生成していく
  - 1 該当要素にdata属性を付与する ex. `<input type="text" name="email" data-cy="login-email"`
  - 2 上述のChrome拡張で操作のレコード
  - 3 2.で生成したテストコードの微調整
※詳しくは[こちらのscrapboxを参照](https://scrapbox.io/ispec/2021%E5%B9%B4_%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88)

## コード生成ツールに関して
[Hygen](https://www.hygen.io/)を利用しており、以下のコマンドを実行することで対話形式でコードを生成することができます

### components配下にvueの雛形コードを生成
```bash
$ yarn hygen component new

? コンポーネントの名前を入力してください。
例) Header › ExampleButton

? components以下のパスを入力してください。
例) advanced › common

Loaded templates: _templates
       added: components/common/example-button/index.vue
✨  Done in 71.36s.
```

生成されるコード
```vue
<template>
  <div class="example-button"></div>
</template>

<style lang="scss" scoped>
// .example-button {}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class ExampleButton extends Vue {}
</script>
```
</details>

### pages配下にvueの雛形コードを生成
```bash
$ yarn hygen page new

? ページの名前を入力してください。
例) UserDetail › ExampleTop

? pages以下のパスを入力してください。
例) user/_id › example

Loaded templates: _templates
       added: pages/example/index.vue
✨  Done in 78.91s.
```

生成されるコード
```vue
<template>
  <div class="example-top-page"></div>
</template>

<style lang="scss" scoped>
// .example-top-page {}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class ExampleTopPage extends Vue {}
</script>
```

### コードの雛形、生成の際に求める入力の定義
`/_templates/{任意の名前}/new`配下に以下のファイルを作成をします
- `prompt.js`
  - 生成の際に求める入力
- `{任意の名前}.ejs.t`
  - 実際に生成するコードの雛形
  - `prompt.js`で定義した入力で得られる値をテンプレート内で利用することができる[公式ページ](https://www.hygen.io/docs/templates)参照
  - 生成するファイルの数だけ作成
