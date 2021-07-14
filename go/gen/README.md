# smallnest/gen

データベーススキーマからGoの構造体を生成するコマンドです。

## Usage

1. 環境変数の設定
```
cp gen/.env.default gen/.env
```

2. 接続したいDB以外をコメントアウトする

gen/.env
```
TEMP_DIR="./gen/templates"
OUT_DIR="./pkg/infra/entity"

##### Article #####

DB_DRIVER=mysql
...

##### Admin #####

# DB_DRIVER=mysql
...
```

3. 以下のコマンドを実行
```
$ make gen
```

## Option

- 上書き保存

Makefile
```
$ docker-compose run --rm gen \
	gen --sqltype=$(sqltype) \
    ...
    --overwrite
```

## And more
https://github.com/smallnest/gen
