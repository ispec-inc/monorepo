import { FormAbstructModule, FormInputType } from './form-abstruct-module';
import FormGroupModule from './form-group';
import FormInputModule from './form-input';
export declare type FormGroupTempleteProvider = {
    inputsProvider: (value?: any) => FormInputModule<any>[];
    headingProvider: (value: any) => string;
};
export default class FormGroupListModule extends FormAbstructModule<any> {
    groups: FormGroupModule[];
    groupTemplate: FormGroupTempleteProvider;
    key: string;
    type: FormInputType;
    label: string;
    openPanelIds: number[];
    constructor(groups: FormGroupModule[], key: string, template: {
        inputsProvider: () => FormInputModule<any>[];
        headingProvider: (value: any) => string;
    }, label: string);
    clear(): void;
    get value(): any;
    appendNewGroup(): void;
    removeGroupByIndex(index: number): void;
}
