import { IFormModule } from "./interfaces/form-module";
import { FormStructure } from "./types/form-structure";
export declare class FormModule<T extends {
    [key: string]: unknown;
}> implements IFormModule<T> {
    readonly structure: FormStructure<T>;
    readonly order: (keyof T)[];
    readonly isSeparated = false;
    constructor(structure: FormStructure<T>, order: (keyof T)[]);
    getFormValue(): T;
    clear(): void;
    get inputs(): FormStructure<T>[keyof T][];
}
