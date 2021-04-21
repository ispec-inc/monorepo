import { FormAbstructModule } from './form-abstruct-module'
import FormGroupModule from './form-group'
import FormImageInputModule from './form-image-input'
import FormSwitchInputModule from './form-switch-input'

export default class FormModule<
  T extends FormAbstructModule<any> | FormGroupModule
> {
  inputs: T[]
  tabs?: string[]

  constructor(inputs: T[]) {
    this.inputs = inputs
    this.inputs.forEach((input: FormAbstructModule<any> | FormGroupModule) => {
      if (input instanceof FormGroupModule) {
        if (this.tabs === undefined) {
          this.tabs = []
        }
        this.tabs.push(input.label)
      }
    })
  }

  clear(): void {
    for (const input of this.inputs) {
      input.clear()
    }
  }

  formValue(): any {
    let value: any = {}

    this.inputs.forEach((input: FormAbstructModule<any> | FormGroupModule) => {
      value = Object.assign(value, this.createFormValue(input))
    })

    return value
  }

  createFormValue(input: FormAbstructModule<any> | FormGroupModule): any {
    let value: any = {}
    if (input instanceof FormGroupModule) {
      input.inputs.forEach(
        (childInput: FormAbstructModule<any> | FormGroupModule) => {
          value = Object.assign(value, this.createFormValue(childInput))
        }
      )
    } else if (input instanceof FormImageInputModule) {
      value[input.key] = input.file
    } else if (input instanceof FormSwitchInputModule) {
      value = Object.assign(value, input.getValueAll())
    } else {
      value[input.key] = input.value
    }
    return value
  }

  get isConstructedFormGroups(): boolean {
    return this.tabs !== undefined
  }
}
