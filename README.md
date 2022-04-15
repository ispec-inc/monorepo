# monorepo

monorepoは、ゼロイチ開発の品質、速度をあげることを目的として、ispecがプロジェクトを通じて得たプラクティスを蓄積、集約し、新しくプロジェクトを始める際のテンプレートとして利用できるようにするためのOSSプロジェクトです。

monorepo is an OSS project that aims to improve the quality and speed of MVP development by accumulating and consolidating the practices that ispec has learned through its projects and making them available as templates for starting new projects.


## Features
- [Migration](./migration)
- [Go](./go)
- [TypeScript](./typescript)
- [Terraform](./terraform)

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

