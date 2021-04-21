export declare type FormInputType = 'text' | 'select' | 'image' | 'number' | 'date' | 'list' | 'group' | 'switch';
export declare abstract class FormAbstructModule<T> {
    abstract value: T | undefined;
    abstract key: string;
    abstract type: FormInputType;
    abstract clear(): void;
}
