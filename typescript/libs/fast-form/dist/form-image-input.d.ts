import FormInputModule from './form-input';
export default class FormImageInputModule extends FormInputModule<string> {
    private _file;
    isFetching: boolean;
    constructor(label: string, imageUrl: string, key: string);
    set file(value: File | undefined);
    get file(): File | undefined;
    setImageFile(url: string): void;
    clear(): void;
}
