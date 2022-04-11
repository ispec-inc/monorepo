import { ValueObjectUtils } from "../_utils"

export class SamplePostId {
  private readonly _value: number

  constructor(value: number) {
    if (!SamplePostId.isValid(value)) {
      throw new TypeError(`${value} is an invalid value`)
    }

    this._value = value
  }

  get value(): number {
    return this._value
  }

  equals(to: SamplePostId): boolean {
    return this._value === to.value
  }

  static isValid(value: number): boolean {
    return ValueObjectUtils.isNaturalNumber(value)
  }

  static from(value: unknown): SamplePostId {
    return new this(Number(value))
  }
}
