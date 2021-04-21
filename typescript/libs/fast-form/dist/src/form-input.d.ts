import { FormAbstructModule, FormInputType } from './form-abstruct-module';
export default abstract class FormInputModule<T> extends FormAbstructModule<T> {
    label: string;
    private _value;
    type: FormInputType;
    rules: string;
    key: string;
    constructor(label: string, value: T | undefined, type: FormInputType, key: string, rules?: string);
    set value(value: T | undefined);
    get value(): T | undefined;
}
