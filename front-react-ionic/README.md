# react-ionic-template

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
