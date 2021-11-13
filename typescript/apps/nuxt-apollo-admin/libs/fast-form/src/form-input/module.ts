import { IFormModuleItem } from "../interfaces/form-module-item"
import { InputModuleType } from "../types/input-module-type"

export abstract class FormInputModule<T> implements IFormModuleItem<T> {
  private readonly _rules: string[]
  private displayConditionFn?: () => boolean

  protected _value: T

  readonly label: string
  readonly type: InputModuleType

  constructor(label: string, value: T, type: InputModuleType, rules: string[]) {
    this.label = label
    this._value = value
    this.type = type
    this._rules = rules
  }

  get rules(): string {
    return this._rules.join('|')
  }

  set value(value: T) {
    this._value = value
  }

  get value(): T {
    return this._value
  }

  get isVisible(): boolean {
    return this.displayConditionFn ? this.displayConditionFn() : true
  }

  setDisplayConditionFn(displayConditionFn: () => boolean): void {
    this.displayConditionFn = displayConditionFn
  }

  abstract clear(): void
}