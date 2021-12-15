# monorepo/go

## Features

### Packages
- [Application Error](./pkg/apperror/) is a wrapper for errors that is easy to handle at the application level.
- [Application Logger](./pkg/applog/) is a package provides interface and multiple implementations (sentry, local logging) of error notification.
- [Message Bus](./pkg/msgbs) is a publisher/subscriber package for inter-service messaging and implementation using Redis Pub/Sub.
- [Test Tool](./pkg/testool) is a package of helpers for running tests.
- [Presenter](./pkg/presenter) is a package of http response presenter depends on apperror.

