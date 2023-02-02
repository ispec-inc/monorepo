# Model/Mutate
## Overview

本ディレクトリには単一のGraphqlMutationにつき一つのモデルを作成し、配置する。  

## Details(limitations)  

- 単一の`request type`(`/types/request`のinterfaceのこと)に対し、対応する一つのModelとして作成する
- APIのリクエストに関する値の変換などのビジネスロジックは可能な限りこのモデルに集約させる
