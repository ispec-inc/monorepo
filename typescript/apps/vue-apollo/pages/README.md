# PAGES

In a Vuetify project, you can put all the logic in the pages and place the Vuetify components directly in the template.
Vuetifyプロジェクトでは、pagesにロジックを全てもたせ、vuetifyのコンポーネントを直接templateに配置していく。

We will reduce the css description as much as possible and write the style directly in the vuetify attribute.
cssの記述をできる限り減らし、vuetifyの属性に直接スタイルを記述していく
([詳しくはドキュメント参照/More info in...](https://vuetifyjs.com/ja/introduction/why-vuetify/))

If you want to create the patterns you use frequently, you can extend the components of Vuetify and define new ones in `components/advanced`.
よく使うパターンを切り出して使いまわしたい時は、Vuetifyのコンポーネントを拡張して、`components/advanced`に新しく定義する。

If you don't want to use Vuetify component but in such cases like you want to use the same layout in some pages, you can create a new directory under `components` and create components reserved for layout.
For example, `components/layouts`.
その他、Vuetifyコンポーネントは使わないけど、同一のレイアウトを使いまわしたいなどがあれば、適宜`components`配下にディレクトリを生やして配置する。
例：`components/layouts`など。

<br>
This directory contains your Application Views and Routes.
The framework reads all the `*.vue` files inside this directory and creates the router of your application.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/routing).

