import FormInputModule from './form-input';
export default class FormDateInputModule extends FormInputModule<string> {
    private _date;
    isOpenDatePciker: boolean;
    constructor(label: string, value: string | undefined, key: string);
    clear(): void;
    get date(): string | undefined;
    set date(value: string | undefined);
}
