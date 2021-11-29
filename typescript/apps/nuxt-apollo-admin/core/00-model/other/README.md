# Model/Other

## Overview

本ディレクトリには他`View Model`でインスタンスとして利用するモデルを配置する

## Details(limitations)  

- 基本はschemaの最小単位のカラム一つにつき一つのモデルを配置する
  - ex) DateTime etc...
- その他、複数の`View Model`で共通化できるモデルを配置する
  - できるだけ少数のカラムを利用してモデルを構築する
  - ex) name(firstName, lastName) etc...
- `types/model`を参照できる唯一の層である
