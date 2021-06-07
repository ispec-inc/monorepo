# PAGES

Vuetifyプロジェクトでは、pagesにロジックを全てもたせ、vuetifyのコンポーネントを直接templateに配置していく。

cssの記述をできる限り減らし、vuetifyの属性に直接スタイルを記述していく
([詳しくはドキュメント参照](https://vuetifyjs.com/ja/introduction/why-vuetify/))

Vuetifyのコンポーネントを拡張して、よく使うパターンで使いまわしたい時は、`components/advanced`に新しく定義する。

その他、vuetifyコンポーネントは使わないけど、同一のレイアウトを使いまわしたいなどがあれば、適宜`components`配下にディレクトリを生やして配置する

<br>
This directory contains your Application Views and Routes.
The framework reads all the `*.vue` files inside this directory and creates the router of your application.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/routing).

