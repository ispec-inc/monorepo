# Go Best Practices

ispecのGo言語による開発のBest Practiceを集めたアプリケーション。

## 背景

ispecがプロジェクトを通じて得たプラクティスが、暗黙知化してしまっている。

## 目的
暗黙知化せずにコードとドキュメントとしてまとめることで、知見を共有する。

## アーキテクチャ

`Repository`のレイヤーをインターフェースにしたレイヤードアーキテクチャを採用。

```
<DS>Adapter -> <DS>Usecase -> <I>Repository <- <DS>DAO
```

- `Repository`をmockにすり替えて`Usecase`の単体テストをしたい。
- `Adapter`のテストは、`Usecase`込みでe2eでテストをすることの方が多いため、インターフェースにする必要性は低い。


などの理由で、このアーキテクチャを採用している。


- see also [miro](https://miro.com/app/board/o9J_koVCBzI=/A)
    - アカウントを持ってない方は、持ってそうな方に連絡をしてください！！

## ディレクトリ構成

```
 cmd/ -> srcにあるビジネスロジックをAPI・WEBなどの役割やHTTP・gRPCなどのプロトコルによって呼び分けるサーバやスクリプト
   ├── api -> HTTPプロトコルで通信を受け付けるAPIサーバ（https://api.example.comみたいな）
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

## Docker
本番環境用のDockerと開発環境用のDockerを分けている。これは、

- 開発環境では、ホットリロードなどの開発効率が上がる機能を使用したい。
- 本番環境では、なるべくコンテナサイズを小さくし、起動と実行が速い状態を保ちたい。

ためである。

開発環境のイメージではでは、ホットリロードを実現するためにrealizeを使用してコードの変更を検知できるようにている。

本番環境のイメージでは、マルチステージビルドを使用して、エントリポイントとなるバイナリだけが残るようにしている。

## CI (継続的インテグレーション)
特定の一箇所の変更が他の場所に影響を与えてしまったときに、それを早期に特定するためにテストをGitHub Actionsの上で回している。自動化されたテストスイートが各モジュールに存在していれば、品質を担保したまま新しい機能開発を行うことができる。


## テスト
- テーブル駆動テストのメリット・デメリット
- mockioの使用


## エラーハンドリング
goの標準の`error`インターフェースでは、エラーの種類を管理して引き回したりすることができない。そのため、`error`をラップした`apperror`を定義し、`apperror`で`error`をラップすることで、`Repository`で発生したエラーの種類を引き回してHTTPのステータスコードに変換したりすることができるようになる。


## ロギング
- Sentryの説明とLocalの諸々
