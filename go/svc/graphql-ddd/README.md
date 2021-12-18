# monorepo/go/svc/graphql-ddd

## API Design
GraphQLを採用しています。スキーマファイルの取得を含めたエンドポイントの一覧は以下の通りです。

```
GET /graphql-ddd/health // ヘルスチェック
GET /graphql-ddd/schema.graphql // スキーマ情報の取得
POST /graphql-ddd/graphql // スキーマ情報の取得
```

## Packages
- [Config](./pkg/config) is a package that creates a singleton of config based on environment variables.
- [Domain](./pkg/domain) is a set of codes implemented by domain-driven development.
- [Middleware](./pkg/middleware) is a package of [go-chi middleware](https://github.com/go-chi/chi#middleware-handlers).
- [Handler](./pkg/handler) is a package of GraphQL API handler. It is necessary to implement the query and mutation defined in [schema](./pkg/schema).
- [Infra](./pkg/infra) is a package of an implementation that satisfies the interfaces defined in the [domain](./pkg/domain) layer.
- [Loader](./pkg/loader) is a package of implementations dataloader in GraphQL.
- [Registry](./pkg/registry) is a package of a DI container to tie the domain layer interface to the infrastructure implementation.
- [Resolver](./pkg/resolver) is a set of codes to satisfy the type of type defined in the schema, called from Handler.
- [Schema](./pkg/schema) is a  schema definition and the code to embed it at compile time.
- [Use Case](./pkg/uc) is a package that calls code in the [domain](./pkg/domain) layer to realize use cases.
