import FormInputModule from './form-input'

export default class FormDateInputModule extends FormInputModule<string> {
  private _date: Date | undefined

  isOpenDatePciker: boolean

  constructor(label: string, value: string | undefined, key: string) {
    super(label, value, 'date', key, 'required')
    this.isOpenDatePciker = false
    this._date = undefined
    this.date = value
  }

  clear() {
    this.date = undefined
  }

  get date(): string | undefined {
    return this._date?.toISOString().split('T')[0]
  }

  set date(value: string | undefined) {
    this._date = value ? new Date(value) : undefined
    this.value = this._date?.toISOString()
  }
}
