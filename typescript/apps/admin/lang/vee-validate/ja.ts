const veeValidateLang = {
  code: 'ja',
  messages: {
    alpha: '{_field_}はアルファベットのみ使用できます',
    alpha_num: '{_field_}は英数字のみ使用できます',
    alpha_dash: '{_field_}は英数字とハイフン、アンダースコアのみ使用できます',
    alpha_spaces: '{_field_}はアルファベットと空白のみ使用できます',
    between: '{_field_}は{min}から{max}の間でなければなりません',
    confirmed: '{_field_}が一致しません',
    digits: '{_field_}は{length}桁の数字でなければなりません',
    dimensions: '{_field_}は幅{width}px、高さ{height}px以内でなければなりません',
    email: 'メールアドレスのフォーマットに誤りがあります',
    excluded: '{_field_}は不正な値です',
    ext: '{_field_}は有効なファイル形式ではありません',
    image: '{_field_}は有効な画像形式ではありません',
    integer: '{_field_}は整数のみ使用できます',
    is: '{_field_}が一致しません',
    length: '{_field_}は{length}文字でなければなりません',
    max_value: '{_field_}は{max}以下でなければなりません',
    max: '{_field_}は{length}文字以内にしてください',
    mimes: '{_field_}は有効なファイル形式ではありません',
    min_value: '{_field_}は{min}以上でなければなりません',
    min: '{_field_}は{length}文字以上で入力してください',
    numeric: '{_field_}は数字のみ使用できます',
    oneOf: '{_field_}は有効な値ではありません',
    regex: '{_field_}のフォーマットが正しくありません',
    required: '{_field_}を入力してください',
    required_if: '{_field_}は必須項目です',
    size: '{_field_}は{size}KB以内でなければなりません',
  },
}

export default veeValidateLang

export type VeeValidateRule = keyof typeof veeValidateLang.messages | `max:${number}` | `length:${number}` | `ext:${string}`
