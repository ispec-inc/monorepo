import { FormInputModule } from "./module";
import { IFormModuleItem } from "../interfaces/form-module-item";
import { FormStructure } from "../types/form-structure";

export class FormGroupModule<T extends { [key: string]: unknown }> implements IFormModuleItem<T> {
  private readonly headingProvider: (value: T) => string
  readonly structure: FormStructure<T>
  readonly order: (keyof T)[]
  readonly type = 'group'

  constructor(structure: FormStructure<T>, order: (keyof T)[], headingProvider: (value: T) => string) {
    this.structure = structure
    this.order = order
    this.headingProvider = headingProvider
  }

  get heading(): string {
    return this.headingProvider(this.value)
  }

  get value(): T {
    const entries = (Object.entries(this.structure) as [string, FormInputModule<unknown>][]).map(([key, module]) => {
      return [key, module.value]
    })

    return Object.fromEntries(entries)
  }

  get inputs(): FormStructure<T>[keyof T][] {
    return this.order.map((o) => this.structure[o])
  }

  clear(): void {
    for (const k of this.order) {
      this.structure[k].clear()
    }
  }
}