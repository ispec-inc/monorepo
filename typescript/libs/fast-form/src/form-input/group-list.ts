import { IFormModuleItem } from "../interfaces/form-module-item";
import { FormGroupModule } from "./group";

export class FormGroupListModule<T extends { [key: string]: unknown }> implements IFormModuleItem<T[]> {
  private readonly formGroupInitializer: (value?: T) => FormGroupModule<T>
  private _groups: FormGroupModule<T>[]
  readonly label: string
  readonly type = 'list'

  openPanelIds: number[]

  constructor(label: string, value: T[], formGroupInitializer: (value?: T) => FormGroupModule<T>) {
    this.label = label
    this._groups = value.map((v) => formGroupInitializer(v))
    this.formGroupInitializer = formGroupInitializer
    this.openPanelIds = []
  }

  get groups(): FormGroupModule<T>[] {
    return this._groups
  }

  get value(): T[] {
    return this._groups.map((g) => g.value)
  }

  clear(): void {
    this._groups = []
  }

  public appendNewGroup() {
    this._groups.push(this.formGroupInitializer())
  }

  public removeGroupByIndex(index: number) {
    this._groups = this._groups.filter((_, i) => i !== index)
    this.openPanelIds = this.openPanelIds.filter((id) => id !== index)
    this.openPanelIds = this.openPanelIds.map((id) => {
      if (id > index) {
        return id - 1
      }
      return id
    })
  }
}