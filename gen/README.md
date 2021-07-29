# smallnest/gen

データベーススキーマからGoの構造体を生成するコマンドです。

## Usage

0. [DBをセットアップ](../go/README.md)

1. 環境変数の設定
```
cp gen/.env.default gen/.env
```

2. 接続したいDB以外をコメントアウトする

gen/.env
```
##### Article #####

# DB_DRIVER=mysql
...

##### Interview #####

DB_DRIVER=mysql
...
```

3. 以下のコマンドを実行
```
$ make gen
```

## Option

- 上書き保存

```
$ make gen opt=--overwrite
```

- .protoファイルを生成

```
$ make protogen
```

- .protoファイルを上書き保存

```
$ make protogen opt=--overwrite
```

## And more
https://github.com/smallnest/gen
