import FormInputModule from './form-input'
import { FormInputType } from './form-abstruct-module'
import FormGroupListModule from './form-group-list'

export default class FormGroupModule {
  inputs: (FormInputModule<any> | FormGroupListModule)[]
  headingProvider: (value: any) => string
  type: FormInputType
  label: string

  constructor(
    inputs: (FormInputModule<any> | FormGroupListModule)[],
    headingProvider?: (value: any) => string,
    label?: string
  ) {
    this.inputs = inputs
    this.headingProvider =
      headingProvider ||
      (() => {
        return ''
      })
    this.label = label || ''
    this.type = 'group'
  }

  public clear() {
    this.inputs.forEach((input: FormInputModule<any> | FormGroupListModule) => {
      input.clear()
    })
  }

  get value(): any {
    const value: any = {}

    this.inputs.forEach((input: FormInputModule<any> | FormGroupListModule) => {
      value[input.key] = input.value
    })

    return value
  }

  get heading(): string {
    return this.headingProvider(this.value)
  }
}
