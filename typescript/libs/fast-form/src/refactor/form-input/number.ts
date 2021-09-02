import { FormInputModule } from "./module";

export class FormNumberInputModule extends FormInputModule<number> {
  constructor(label: string, value: number, rules?: string[]) {
    super(label, value, 'number', (rules || []).concat(['numeric']))
  }

  clear(): void {
    this.value = 0
  }
}