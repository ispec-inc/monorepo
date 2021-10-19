import { required, numeric, excluded, integer, email } from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_}を入力してください',
})

extend('numeric', {
  ...numeric,
  message: '{_field_}は正の整数で入力してください',
})

extend('excluded', {
  ...excluded,
  message: '無効な値です',
})

extend('integer', {
  ...integer,
  message: '{_field_}は正の整数で入力してください',
})

extend('email', {
  ...email,
  message: '{_field_}に正しいメールアドレスを入力してください',
})