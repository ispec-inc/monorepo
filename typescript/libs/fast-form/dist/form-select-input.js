import FormInputModule from './form-input';
export default class FormSelectInputModule extends FormInputModule {
    constructor(label, value, key, choices) {
        super(label, value, 'select', key, 'required');
        this.choices = choices;
    }
    clear() {
        this.value = undefined;
    }
}
