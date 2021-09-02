import { FormInputModule } from "./module";

export class FormTextInput extends FormInputModule<string> {
  constructor(label: string, value: string, rules?: string[]) {
    super(label, value, 'text', rules || [])
  }

  clear(): void {
    this.value = ''
  }
}