import FormInputModule from './form-input';
export default class FormSwitchInputModule extends FormInputModule {
    constructor(label, value, key, inputs = [], openCondition = false) {
        super(label, value, 'switch', key);
        this.value = value;
        this.inputs = inputs;
        this.openCondition = openCondition;
    }
    clear() {
        this.value = false;
        this.inputs.forEach((i) => {
            i.clear();
        });
    }
    get shouldShowInputs() {
        return this.value === this.openCondition;
    }
    getValueAll() {
        var _a;
        const result = {};
        result[this.key] = this.value;
        if (this.shouldShowInputs) {
            (_a = this.inputs) === null || _a === void 0 ? void 0 : _a.forEach((i) => {
                result[i.key] = i.value;
            });
        }
        return result;
    }
}
