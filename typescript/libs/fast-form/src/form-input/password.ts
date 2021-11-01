import { FormInputModule } from "./module";

export class FormPasswordInputModule extends FormInputModule<string> {
  constructor(label: string, value: string, rules?: string[]) {
    super(label, value, 'password', rules || [])
  }

  clear(): void {
    this.value = ''
  }
}