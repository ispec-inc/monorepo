import FormInputModule from './form-input';
export declare type SelectFormChoice<T> = {
    text: string;
    value: T;
};
export default class FormSelectInputModule<T> extends FormInputModule<T> {
    choices: SelectFormChoice<T>[];
    constructor(label: string, value: T | undefined, key: string, choices: SelectFormChoice<T>[]);
    clear(): void;
}
