import FormInputModule from './form-input';
export default class FormTextInputModule extends FormInputModule {
    constructor(label, value, key) {
        super(label, value, 'text', key, 'required');
    }
    clear() {
        this.value = undefined;
    }
}
