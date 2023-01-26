# Architecture

## Directory
The code in each directory is as follows.
```
├── Makefile
├── README.md
├── bin
│   └── server
├── cmd # Entry point to start the server, insert a seed, etc.
├── docker
├── mkdocs.yml
├── pkg # Common packages referenced by `svc`
└── svc # The code for each microservice
    ├── admin
    └── article
```

## `go/pkg` design
The pkg of go implements the code common to svc. Error logging, error wrappers, ORM-dependent structs, etc. should also be implemented here.

Basically, the following rules should be followed.

1. Do not write any code in pkg that depends on svc. (Don't refer to svc).
2. Do not write code related to the business logic of a specific svc. (ORMs should be limited to struct definitions only. Do not implement business logic here. )

## `go/svc` design

Splitting `svc` is a very critical decision in development. Be sure to discuss it with your development team.

A common way to do this is to use

- Divide by load characteristics (Admin, User, etc.)
- Divide by variability (notification system, media upload system, etc.)
