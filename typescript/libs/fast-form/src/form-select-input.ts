import FormInputModule from './form-input'

export type SelectFormChoice<T> = {
  text: string
  value: T
}

export default class FormSelectInputModule<T> extends FormInputModule<T> {
  choices: SelectFormChoice<T>[]

  constructor(
    label: string,
    value: T | undefined,
    key: string,
    choices: SelectFormChoice<T>[]
  ) {
    super(label, value, 'select', key, 'required')

    this.choices = choices
  }

  clear() {
    this.value = undefined
  }
}
