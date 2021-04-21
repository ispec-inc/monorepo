import { FormAbstructModule, FormInputType } from './form-abstruct-module'
import FormGroupModule from './form-group'
import FormInputModule from './form-input'

export type FormGroupTempleteProvider = {
  inputsProvider: (value?: any) => FormInputModule<any>[]
  headingProvider: (value: any) => string
}

export default class FormGroupListModule extends FormAbstructModule<any> {
  groups: FormGroupModule[]
  groupTemplate: FormGroupTempleteProvider

  key: string
  type: FormInputType
  label: string
  openPanelIds: number[]

  constructor(
    groups: FormGroupModule[],
    key: string,
    template: {
      inputsProvider: () => FormInputModule<any>[]
      headingProvider: (value: any) => string
    },
    label: string
  ) {
    super()
    this.groups = groups
    this.key = key
    this.groupTemplate = template
    this.type = 'list'
    this.label = label
    this.openPanelIds = []
  }

  clear(): void {
    this.groups = []
  }

  get value(): any {
    return this.groups.map((group: FormGroupModule) => {
      return group.value
    })
  }

  public appendNewGroup() {
    const newGroup = new FormGroupModule(
      this.groupTemplate.inputsProvider(),
      this.groupTemplate.headingProvider
    )
    this.groups.push(newGroup)
  }

  public removeGroupByIndex(index: number) {
    this.groups = this.groups.filter((_, i) => i !== index)
    this.openPanelIds = this.openPanelIds.filter((id) => id !== index)
    this.openPanelIds = this.openPanelIds.map((id) => {
      if (id > index) {
        return id - 1
      }
      return id
    })
  }
}
