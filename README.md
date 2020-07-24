# go-distributed-monolith
単一のDBに対してやりとりをするようなシステムアーキテクチャにおけるGoのサーバーのテンプレートPJです．

## Usage
1. github.com/ispec-inc/migrationをクローンする

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
