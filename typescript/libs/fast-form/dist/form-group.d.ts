import FormInputModule from './form-input';
import { FormInputType } from './form-abstruct-module';
import FormGroupListModule from './form-group-list';
export default class FormGroupModule {
    inputs: (FormInputModule<any> | FormGroupListModule)[];
    headingProvider: (value: any) => string;
    type: FormInputType;
    label: string;
    constructor(inputs: (FormInputModule<any> | FormGroupListModule)[], headingProvider?: (value: any) => string, label?: string);
    clear(): void;
    get value(): any;
    get heading(): string;
}
