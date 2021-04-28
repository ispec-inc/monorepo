# Error handling & Logging

エラーとロギングの設計

# Background

サービスで起きているエラーを通知するために，Sentryを利用している．
Sentry上で，エラーのStackTraceを出したり，発生しているエラーのタイトルをわかりやすい形で表示するためには，StackTraceを残せるエラーを利用したり，エラーの型を独自で定義する必要がある．

## Go errors

Goの標準のエラーパッケージ (`errors`) では，スタックトレースを記録してくれない．
そのため，ウェブアプリケーションなどの開発には スタックトレースを保持することができる，サードパーティのパッケージをい利用することが一般的 ([github.com/pkg/errors](https://github.com/pkg/errors) など)．
しかし，これらのエラーパッケージもエラーの種類を表すコードなどを保持しておくことはできないので，その場合にはエラーパッケージを自作する必要がある (サードパーティのパッケージでコードを保持できるものもあるが，アプリケーションごとにコードを定義したいので，自作する方が良いと考えている)．


## Sentry

Sentryは，アプリケーションのモニタリングツール．
エラーなどをSentryにリポートしておくことで，アプリケーション上でどのようなエラーが発生しているか，などをまとめて見ることができる．

GoでリポートしたエラーがSentry上で表示される際の特徴には，以下のものが含まれる

- エラーの型が，Sentry上で表示される際のエラーのタイトルになる
- エラーのStackTraceを表示することができる


そのため，何も考えずにGoの標準パッケージのエラーをリポートしていると，エラーのタイトルは， `*errors.errorString` となり，StackTraceも表示されない．


# Objective

以下の条件を満たすようなエラーパッケージを実現し，Sentryの最大限に活用する

- エラーの種類を表すコードを保持することができる
- エラーのStackTraceを保持できる
- エラーが発生した場所や内容に応じて，エラーの型を使い分ける


# Package Dependencies

`pkg/apperror` <- `pkg/applog` -> `<I> pkg/applog/logger` <- `pkg/sentry, pkg/stdlog`


# Packages

## `pkg/apperror`

アプリケーションコードで使う自作エラーパッケージ．

ユースケース

- アプリケーション内で発生したエラーを表現する際に利用する．

提供する機能

- エラーを作る
    - `apperror.New` : `apperror.Code` とメッセージを渡して，`error` を返す
    - `apperror.Wrap` : `apperror.Code` と `error` インターフェースを満たしているオブジェクト を渡して，`error` を返す
        - ここで渡すエラーは，可能な限りGoの標準エラーパッケージのエラーではなく，各パッケージ独自のエラー型のエラーをわたす．
    - エラーを作る際の特徴
        - `apperror.Error` を `github.com/pkg/errors` を使ってStackTraceをつけ他ものを `error` として返す
- エラー情報を取り出す (`apperror.Unwrap`)
    - `github.com/pkg/errors` でWrapされたエラーから，`apperror.Error` を取り出して返す
    - presenter で，エラーのコードを取り出して，httpのstatus codeにしたり，sentryでリポートする際に元のエラーの情報を取り出すために利用する


## `pkg/applog`

アプリケーションのエラーをロギングするためのパッケージ．

ユースケース

- Usecaseレイヤーでエラーが発生した時に呼び出す

提供する機能

- `applog.SetUser` : ユーザ情報をセットする
    - 渡されたコンテキストに，ユーザの情報をセットして返す
- `applog.LogError` : エラーをロギングする
    - コンテキストとエラーを受け取り，コンテキストに登録してあるユーザ情報と，エラーから情報を抽出して整形し，`pkg/applog/logger.Logger.Error` を呼び出す


## `pkg/applog/logger`

`pkg/applog` が要求しているインターフェースを定義している．

提供しているインターフェース

- `logger.Logger.Error` : エラーとユーザの情報を受け取る


## `pkg/sentry`

`pkg/applog/logger.Logger` のインターフェースを満たすように実装してある，Sentryにエラー情報をリポートするためのパッケージ


## `pkg/stdlog`

`pkg/applog/logger.Logger` のインターフェースを満たすように実装してある，標準出力にエラー情報を出すパッケージ

ユースケース

- 開発環境でエラーを出力するために利用
