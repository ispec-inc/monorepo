import { FormAbstructModule, FormInputType } from './form-abstruct-module'

export default abstract class FormInputModule<T> extends FormAbstructModule<T> {
  label: string
  private _value: T | undefined
  type: FormInputType
  rules: string
  key: string

  constructor(
    label: string,
    value: T | undefined,
    type: FormInputType,
    key: string,
    rules?: string
  ) {
    super()
    this.label = label
    this._value = value
    this.type = type
    this.key = key
    this.rules = rules || ''
  }
  set value(value: T | undefined) {
    this._value = value
  }

  get value() {
    return this._value
  }
}
