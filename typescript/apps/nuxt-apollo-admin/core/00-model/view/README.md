# Model/View
## Overview

本ディレクトリには単一のView(Page)につき一つのモデルを作成し、配置する。  
所謂、Viewモデルを作成する。

## Details(limitations)  

- 単一の`response type`(`/types/response`のinterfaceのこと)に対し、対応する一つのViewModelとして作成する
- 可能な限り`./other`のモデルを利用しながら、本モデルを構築する
  - また、データに関するロジックは可能な限り依存する`other`のモデルに記述し、寄せるように努めるべきである。
