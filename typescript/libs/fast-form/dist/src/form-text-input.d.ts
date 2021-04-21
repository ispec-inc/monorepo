import FormInputModule from './form-input';
export default class FormTextInputModule extends FormInputModule<string> {
    constructor(label: string, value: string | undefined, key: string);
    clear(): void;
}
