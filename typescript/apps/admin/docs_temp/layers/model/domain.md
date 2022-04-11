# Model (DomainModel)

## 背景
- [Models](./index.md)の「背景」の項参照

## 目的
- [Models](./index.md)の「目的」の項参照

## 定義
- フロントで扱うデータのうち、APIへ送信する値に関連するもの以外を扱うための[Models](./index.md)
- APIから受け取る値に紐づくものが殆どであるが、その他データ変換などの機能を吸収するためのモジュールとして実装することもできる
  - そのデータ変換機能のうち、先述した「APIへ送信する値に関連するもの」は[PayloadModel](./payload.md)として実装する
- `~/core/models/domain/**`で実装される

## 実装
- `$ yarn hygen model new`でファイルを生成
- `DomainModelBase<Params>`を継承する
- コンストラクタで受け取る値は同ファイルの`Params`という名前のinterfaceで定義する

## 実装例
- [SamplePostModelImpl](https://github.com/ispec-inc/monorepo/blob/update/frontend/data-flow/typescript/apps/admin/core/models/domain/sample/index.ts)
- [SamplePostCommentModelImpl](https://github.com/ispec-inc/monorepo/blob/update/frontend/data-flow/typescript/apps/admin/core/models/domain/sample/comment/index.ts)

## 関連
![関連](./domain.png "関連")

## バックリンク
- [Models](./index.md)
- [Services](../service/index.md)
- [Repositories](../repositories/index.md)
- [Frontend Data Flow Architectue](../../index.md)
- [実装手順](../../impl-procedure.md)
