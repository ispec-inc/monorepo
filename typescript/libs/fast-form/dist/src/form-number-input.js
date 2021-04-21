import FormInputModule from './form-input';
export default class FormNumberInputModule extends FormInputModule {
    constructor(label, value, key, excludeZero) {
        const rule = `required|integer|numeric${excludeZero ? '|excluded:0' : ''}`;
        super(label, value, 'number', key, rule);
        this.value = value;
    }
    clear() {
        this.value = undefined;
    }
    get value() {
        if (isNaN(Number(this._val))) {
            return this._val;
        }
        return Number(this._val);
    }
    set value(value) {
        this._val = value === null || value === void 0 ? void 0 : value.toString();
    }
}
