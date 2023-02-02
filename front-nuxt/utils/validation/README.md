# Validation rules

All validation rules are managed here in common.
バリデーションのルールは全てここで共通して管理を行う。

Since vuetify can pass validation rules in an array, we call it from here in the array and pass it to the component.
vuetifyは配列でvalidationのruleを渡せるので、ここから配列の中に呼び出してコンポーネントに渡す。

VeeValidateで用意されているバリデーションルール以外で追加したいものがある場合は、[こちら](https://vee-validate.logaretm.com/v2/guide/custom-rules.html#creating-a-custom-rule)を参照してルールを追加していく。

定義したルールは必ず、同ディレクトリのindex.tsでまとめてexportするようにする。
