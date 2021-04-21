export default class FormGroupModule {
    constructor(inputs, headingProvider, label) {
        this.inputs = inputs;
        this.headingProvider =
            headingProvider ||
                (() => {
                    return '';
                });
        this.label = label || '';
        this.type = 'group';
    }
    clear() {
        this.inputs.forEach((input) => {
            input.clear();
        });
    }
    get value() {
        const value = {};
        this.inputs.forEach((input) => {
            value[input.key] = input.value;
        });
        return value;
    }
    get heading() {
        return this.headingProvider(this.value);
    }
}
