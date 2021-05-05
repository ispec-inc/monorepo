# monorepo

ispec civlization project

## Developement

### Branch & CI/CD Rules

```
.
├── main (master) -> Deploy all changed resource to stg. Run only CI/CD whose codes in "paths" are changed.
├── release/go-admin -> Deploy go/svc/admin to prd. Run go CI and go/svc/admin CD.
├── release/go-article
├── release/ts-admin
├── release/ts-article
├── release/mg-article -> Run migaration/article in prd.
└── release/terraform -> Deploy terraform resources to prd.
```


### Create a new endpoint

1. Add a new *.proto to /proto
2. Open a pull request for 1
3. Review the pull request by both frontend and backend engineers
4. Merge the pull request
5. Implement frontend and backend in parallel
