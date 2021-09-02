import FormInputModule from "../form-input";
import { FormStructure } from "../types/form-structure";

export class FormModule<T extends { [key: string]: unknown }> {
  readonly structure: FormStructure<T>
  readonly order: (keyof T)[]

  constructor(structure: FormStructure<T>, order: (keyof T)[]) {
    this.structure = structure
    this.order = order
  }

  getFormValue(): T {
    const entries = Object.entries(this.structure).map(([key, module]: [string, FormInputModule<unknown>]) => {
      return [key, module.value]
    })

    return Object.fromEntries(entries)
  }

  clear(): void {
    for (const k of this.order) {
      this.structure[k].clear()
    }
  }

  get inputs(): FormStructure<T>[keyof T][] {
    return this.order.map((o) => this.structure[o])
  }
}