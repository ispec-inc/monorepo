# Types/Request

## Overview
外部のAPIの`Request body`に関するtypeはこのディレクトリで定義する。  
このアプリケーションではgraphqlを利用するため、原則`mutation.gql`にてgraphqlのmutationと同時に定義する。  
typeとmutationは必ず同期させる。
(mutationからのtypeの自動生成は要検討)

## Details(limitations)
- 原則mutationによる返却値は `./response` のtypeを参照する
- 同graphql mutationで異なる返却queryを持たせたい場合は、ファイルを分割する

その他は基本はこちらの [typesドキュメント](https://www.notion.so/ispec/fbcc19eac6f6405787527fb62ae361f0) を参照
