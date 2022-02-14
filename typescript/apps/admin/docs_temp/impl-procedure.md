# 実装手順

## マークアップ実装
1. `$ yarn hygen service new`で[Services](./layers/service/index.md)と[Usecases](./layers/service/usecases.md)のファイルを生成する。
1. 該当ページで利用するであろう[Models](./layers/model/index.md)を洗い出し、`$ yarn hygen model new`で必要なだけファイル生成
1. 2で生成した[Model(DomainModel)](./layers/model/domain.md)のinterfaceを定義する
1. 2で生成した[PayloadModel](./layers/model/payload.md)のinterface定義の`/* Replace with the corresponding api request type */`部分を`Record<string, never>`で仮置き
1. 1で生成した[Usecases](./layers/service/usecases.md)のinterfaceを定義する
1. 1で生成した[Services](./layers/service/index.md)を実装する
1. 1で生成した[Usecases](./layers/service/usecases.md)を実装する
1. 2で生成した[Model(DomainModel)](./layers/model/domain.md)を実装する
1. Viewを実装する(1で生成した[Services](./layers/service/index.md)をページ実装ファイルでインスタンス化)

## つなぎこみ実装
1. `types/response/**`、`types/request/**`で、利用するエンドポイントのレスポンス、リクエストのデータ型を定義する
1. [aspida](https://github.com/aspida/aspida)に基づき`api/**`へ利用するAPIのエンドポイントに合わせてファイルを作成、型定義を行う
1. `$ yarn aspida`でAPI呼び出しモジュールに関する定義のビルドを行う
1. つなぎこみ実装に関連する[Model(DomainModel)](./layers/model/domain.md)で、必要に応じて1で定義したレスポンスデータの型を利用してインスタンスを返す関数`static fromApiResponse()`を実装する
1. つなぎこみ実装に関連する[PayloadModel](./layers/model/payload.md)で仮置きしていたinterface定義を、1で定義したリクエストデータの型を用いたものに修正し、`toObject()`メソッドをあらためて実装する
1. [Gateways](./layers/gateway.md)を実装する
1. つなぎこみ実装に関連する[Usecases](./layers/service/usecases.md)の実装を[Gateways](./layers/gateway.md)を用いたものに実装し直す
1. つなぎこみ実装に関連する[Services](./layers/service/index.md)を必要に応じて修正

## バックリンク
- [Frontend Data Flow Architectue](./index.md)
