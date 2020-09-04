# go-distributed-monolith

![CI/CD](https://github.com/ispec-inc/go-distributed-monolith/workflows/gotest/badge.svg)
[![codecov](https://codecov.io/gh/ispec-inc/go-distributed-monolith/branch/master/graph/badge.svg)](https://codecov.io/gh/ispec-inc/go-distributed-monolith)

単一のDBに対してやりとりをするようなシステムアーキテクチャにおけるGoのサーバーのテンプレートPJです．

## Usage
1. [migration](github.com/ispec-inc/migration)をクローンする
マイグレーションとアプリケーションを分離させていて，docker networkでそれらを繋げるような設計をしている．

2. 以下のコマンドを実行
```
$ make init
$ make server
$ docker-compose up # in ispec-inc/migration
```
3. ヘルスチェック
```
$ curl localhost:9000/health
{"message":"success"}
```

## Directory Structure
```
 cmd/ -> srcにあるビジネスロジックをAPI・WEBなどの役割やHTTP・gRPCなどのプロトコルによって呼び分けるサーバやスクリプト
   ├── api -> HTTPプロトコルで通信を受け付けるAPIサーバ（https://api.snkrdunk.comみたいな）
   │   ├── adapter -> HTTP特有の情報（Request Bodyなど）をHTTPに依存しないビジネスロジックでの情報に変換する
   │   │   └── account -> /accounts とかのパスに対応させると分かりやすいかも
   │   │       ├── invitation -> /accounts/invitations
   │   │       │   ├── handler.go -> http.Handlerの実装
   │   │       │   ├── router.go -> handlerをルーティングする
   │   │       │   └── view.go -> レスポンスに使うJSONなど
   │   │       └── ...
   │   ├── (middleware) -> ルーティング時に使うミドルウェア
   │   │   └── auth.go
   │   └── server -> 起動対象のサーバ
   │       ├── main.go -> registryを用いたDBのセットアップやルーティング
   │       ├── middleware.go -> 各middlewareの関数をまとめる
   │       └── router.go -> 各adapterのルーティングをまとめる
   ├── (bin) -> 何らかのビジネスロジックを実行するスクリプトなどもここで管理
   │   └── expire-offer
   │       └── main.go
   └── (web) -> APIサーバ以外にもWEBサーバを提供したい場合はこんな感じでディレクトリを増やしていく（apiやwebはそれぞれ別のECSタスクなどにデプロイされるイメージ）
       └── server
           └── main.go
   src/ -> domainにあるものを組み合わせてビジネスロジックを構成するものをaccountなどの関心分野ごとにディレクトリを切って置く
   └── account -> このあたりのディレクトリの切り方は適当に分かりやすく切る
       ├── invitation
       │   ├── input.go -> ビジネスロジックに対する入力（APIならRequest Bodyとかから作る）
       │   ├── output.go -> ビジネスロジックに対する入力（APIならResponse Bodyに変換する）
       │   ├── usecase.go -> domainを組み合わせてビジネスロジックを構成
       │   └── usecase_test.go
       └── ...
   pkg/ -> DDDにおけるdomain層やinfra層に加え、小さくパッケージに分けたいUtil系などを置く
   ├── apperror -> アプリケーションエラーの定義
   │   └── error.go
   ├── config
   │   ├── app.go -> いろいろなアプリの設定（stg/prdなどの環境名やビジネスロジックで使う数値とか）
   │   ├── rds.go -> RDSのホストとかDSNとかを置く
   │   └── init.go -> アプリ起動時に上記の各種設定を環境変数などから取得して一元管理する
   ├── domain
   │   ├── mock -> repositoryにあるinterfaceを実装するモック
   │   │   ├── invitation.go
   │   │   └── ...
   │   ├── model -> 招待コード生成などのドメインロジックを持つドメインモデルを置く
   │   │   ├── invitation.go
   │   │   └── ...
   │   └── repository -> ドメインの永続化を抽象化するinterfaceを置く
   │       ├── invitation.go
   │       └── ...
   ├── infra
   │   ├── dao -> repositoryにある各interfaceを実装するstructを置く（RDSへの実際のクエリ発行など）
   │   │   ├── invitation.go
   │   │   ├── invitation_test.go
   │   │   └── ...
   │   └── entity -> daoで使う、実際のDB上のデータを表現するstruct（RDSのレコードなど）
   │       ├── invitation.go
   │       └── ...
   ├── mysql -> MYSQLの設定を行い，コネクションを取得
   │   └── init.go
   ├── presenter -> アプリケーションのレスポンスを担う．apperrorのエラーコードの変換など．
   │   └── status_code.go
   └── registry -> repositoryを持つusecaseに対してdaoの実装をDIする軽量DIコンテナ
       └── repository.go
```

## Request Examples
`GET /invitations`
- 招待コードを取得
- リクエスト
```
{
  "id": 1
}
```
- レスポンス
```
{
  "id": 1,
  "user_id": 1,
  "code": "code"
}
```

`POST /invitations`
- 招待コードを作成
- リクエスト
```
{
  "user_id": 1,
  "code": "code"
}
```
- レスポンス
```
{
  "id": 1,
  "user_id": 1,
  "code": "code"
}
```
