import { FormAbstructModule } from './form-abstruct-module';
import FormGroupModule from './form-group';
export default class FormModule<T extends FormAbstructModule<any> | FormGroupModule> {
    inputs: T[];
    tabs?: string[];
    constructor(inputs: T[]);
    clear(): void;
    formValue(): any;
    createFormValue(input: FormAbstructModule<any> | FormGroupModule): any;
    get isConstructedFormGroups(): boolean;
}
