export interface IFormModule<T> {
  readonly isSeparated: boolean
  getFormValue(): T
  clear(): void
}