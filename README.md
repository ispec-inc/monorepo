# go-distributed-monolith
単一のDBに対してやりとりをするようなシステムアーキテクチャにおけるGoのサーバーのテンプレートPJです．

## Usage
1. [migration](github.com/ispec-inc/migration)をクローンする
マイグレーションとアプリケーションを分離させていて，docker networkでそれらを繋げるような設計をしている．

2. 以下のコマンドを実行
```
$ docker network create monolith
$ docker-compose build
$ bash scripts/run.sh # in ispec-inc/go-distributed-monolith
$ docker-compose up # in ispec-inc/migration
```
3. ヘルスチェック

$ curl localhost:9000/health
{"message":"success"}
