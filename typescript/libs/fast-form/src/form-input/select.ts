import { FormInputModule } from "./module";
import { SelectOption } from '../types/select-option'

export class FormSelectInputModule<T> extends FormInputModule<T> {
  readonly choices: SelectOption<T>[]
  private readonly emptyValue: T

  constructor(label: string, value: T, choices: SelectOption<T>[], emptyValue: T, rules?: string[]) {
    super(label, value, 'select', rules || [])
    this.choices = choices
    this.emptyValue = emptyValue
  }

  clear(): void {
    this.value = this.emptyValue
  }
}