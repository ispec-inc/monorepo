import { FormInputModule } from "./module";

export class FormSwitchInputModule extends FormInputModule<boolean> {
  constructor(label: string, value: boolean, rules?: string[]) {
    super(label, value, 'switch', rules || [])
  }

  clear(): void {
    this.value = false
  }
}