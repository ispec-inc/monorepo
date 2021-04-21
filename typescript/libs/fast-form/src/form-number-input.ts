import FormInputModule from './form-input'

export default class FormNumberInputModule extends FormInputModule<
  string | number
> {
  private _val: string | undefined

  constructor(
    label: string,
    value: number | undefined,
    key: string,
    excludeZero?: boolean
  ) {
    const rule = `required|integer|numeric${excludeZero ? '|excluded:0' : ''}`
    super(label, value, 'number', key, rule)
    this.value = value
  }

  clear() {
    this.value = undefined
  }

  get value(): string | number | undefined {
    if (isNaN(Number(this._val))) {
      return this._val
    }
    return Number(this._val)
  }

  set value(value: string | number | undefined) {
    this._val = value?.toString()
  }
}
