import { IFormModuleItem } from "../interfaces/form-module-item";

export type FormStructure<T> = { [P in keyof T]: IFormModuleItem<T[P]> }