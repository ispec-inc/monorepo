import FormInputModule from './form-input'

export default class FormTextInputModule extends FormInputModule<string> {
  constructor(label: string, value: string | undefined, key: string) {
    super(label, value, 'text', key, 'required')
  }

  clear() {
    this.value = undefined
  }
}
