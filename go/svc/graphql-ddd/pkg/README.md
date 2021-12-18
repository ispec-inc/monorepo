# jam-roll/go/svc/collaboration/pkg

## Packages

- [Config](./config) is a package that creates a singleton of config based on environment variables.
- [Domain](./domain) is a set of codes implemented by domain-driven development.
- [Middleware](./middleware) is a package of [go-chi middleware](https://github.com/go-chi/chi#middleware-handlers).
- [Handler](./handler) is a package of GraphQL API handler. It is necessary to implement the query and mutation defined in [schema](./schema).
- [Infra](./infra) is a package of an implementation that satisfies the interfaces defined in the [domain](./domain) layer.
- [Loader](./loader) is a package of implementations dataloader in GraphQL.
- [Registry](./registry) is a package of a DI container to tie the domain layer interface to the infrastructure implementation.
- [Resolver](./resolver) is a set of codes to satisfy the type of type defined in the schema, called from Handler.
- [Schema](./schema) is a  schema definition and the code to embed it at compile time.
- [Use Case](./uc) is a package that calls code in the [domain](./domain) layer to realize use cases.
