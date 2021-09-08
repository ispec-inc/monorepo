import { FormInputModule } from "./module";
import dayjs from 'dayjs'

export class FormDateInputModule extends FormInputModule<string> {
  private readonly format?: string

  constructor(label: string, value: string, format?: string, rules?: string[]) {
    super(label, value, 'date', rules || [])
    this.format = format
  }

  private get dayjsValue(): dayjs.Dayjs {
    return dayjs(this._value)
  }

  private get isValidDate(): boolean {
    return this.dayjsValue.isValid()
  }

  get valueForDisplay(): string {
    return this.isValidDate ? this.dayjsValue.format('YYYY/MM/DD') : ''
  }

  get value(): string {
    return this.isValidDate ? this.dayjsValue.format(this.format) : ''
  }

  set value(value: string) {
    this._value = value
  }

  clear(): void {
    this.value = ''
  }
}