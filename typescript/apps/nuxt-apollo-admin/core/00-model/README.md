## Overview

本ディレクトリにはMVCフレームワークにおける、所謂モデルを作成し、配置する。  

## Details(limitations)  

- View(フレームワーク)へのインターフェイスアダプターを務める。
  - vue コンポーネントで利用しやすいようなデータの加工などのロジックをこのmodel層に可能な限り寄せて配置する
  - データをmodel classとして保存して加工ロジックとしてmethod, getterを生やす

- その他はこちらの [modelドキュメント](https://www.notion.so/ispec/data-flow-fb2e6ee29dc9483c8a9d00d24cf6c55f) を参照
