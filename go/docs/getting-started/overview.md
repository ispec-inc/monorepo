## Getting Started
Since we are setting up a container-based build, you need to install Docker.

## Running Server
If you have Docker installed, you can start up the server by running the make command.

```
$ make build
$ make init
$ make article-migrate in ../migration
$ make seed
$ make server
```

## Testing
The tests are ready to run via Docker as well.

```
$ make test
```

