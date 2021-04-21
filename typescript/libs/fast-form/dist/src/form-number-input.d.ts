import FormInputModule from './form-input';
export default class FormNumberInputModule extends FormInputModule<string | number> {
    private _val;
    constructor(label: string, value: number | undefined, key: string, excludeZero?: boolean);
    clear(): void;
    get value(): string | number | undefined;
    set value(value: string | number | undefined);
}
