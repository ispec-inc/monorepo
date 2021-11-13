import { InputModuleType } from "../types/input-module-type";

export interface IFormModuleItem<T> {
  readonly type: InputModuleType
  value: T
  clear(): void
}