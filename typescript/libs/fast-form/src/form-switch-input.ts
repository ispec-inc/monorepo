import FormInputModule from './form-input'

export default class FormSwitchInputModule extends FormInputModule<boolean> {
  inputs: FormInputModule<any>[]
  openCondition: boolean

  constructor(
    label: string,
    value: boolean,
    key: string,
    inputs: FormInputModule<any>[] = [],
    openCondition: boolean = false
  ) {
    super(label, value, 'switch', key)
    this.value = value
    this.inputs = inputs
    this.openCondition = openCondition
  }

  clear() {
    this.value = false
    this.inputs.forEach((i) => {
      i.clear()
    })
  }

  get shouldShowInputs(): boolean {
    return this.value === this.openCondition
  }

  getValueAll(): any {
    const result = {} as any
    result[this.key] = this.value

    if (this.shouldShowInputs) {
      this.inputs?.forEach((i) => {
        result[i.key] = i.value
      })
    }

    return result
  }
}
