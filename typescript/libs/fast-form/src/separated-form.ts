import { FormModule } from "./form";
import { IFormModule } from "./interfaces/form-module";
import { IFormModuleItem } from "./interfaces/form-module-item";

export class SeparatedFormModule<T extends { [key: string]: { [key: string]: unknown } }> implements IFormModule<T> {
  readonly structure: { [P in keyof T]: FormModule<T[P]> }
  readonly namedOrder: [key: (keyof T), name: string][]
  readonly isSeparated = true

  constructor(structure: { [P in keyof T]: FormModule<T[P]> }, namedOrder: [key: (keyof T), name: string][]) {
    this.structure = structure
    this.namedOrder = namedOrder
  }

  getFormValue(): T {
    const entries = Object.entries(this.structure).map(([key, module]: [string, FormModule<{}>]) => {
      return [key, module.getFormValue()]
    })

    return Object.fromEntries(entries)
  }

  clear(): void {
    for (const [key, _] of this.namedOrder) {
      this.structure[key].clear()
    }
  }

  get separatedInputs(): [tabName: string, inputs: IFormModuleItem<unknown>[]][] {
    return this.namedOrder.map(([key, name]) => [name, this.structure[key].inputs])
  }
}