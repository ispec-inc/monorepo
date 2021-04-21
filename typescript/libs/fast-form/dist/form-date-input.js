import FormInputModule from './form-input';
export default class FormDateInputModule extends FormInputModule {
    constructor(label, value, key) {
        super(label, value, 'date', key, 'required');
        this.isOpenDatePciker = false;
        this._date = undefined;
        this.date = value;
    }
    clear() {
        this.date = undefined;
    }
    get date() {
        var _a;
        return (_a = this._date) === null || _a === void 0 ? void 0 : _a.toISOString().split('T')[0];
    }
    set date(value) {
        var _a;
        this._date = value ? new Date(value) : undefined;
        this.value = (_a = this._date) === null || _a === void 0 ? void 0 : _a.toISOString();
    }
}
