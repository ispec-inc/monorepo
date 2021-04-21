import FormInputModule from './form-input';
export default class FormSwitchInputModule extends FormInputModule<boolean> {
    inputs: FormInputModule<any>[];
    openCondition: boolean;
    constructor(label: string, value: boolean, key: string, inputs?: FormInputModule<any>[], openCondition?: boolean);
    clear(): void;
    get shouldShowInputs(): boolean;
    getValueAll(): any;
}
