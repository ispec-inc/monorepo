import { FormInputModule } from "../refactor/form-input/module";

export type FormStructure<T> = { [P in keyof T]: FormInputModule<T[P]> }