import { ValueObjectUtils } from "../../_utils"

export class SamplePostCommentId {
  private readonly _value: number

  constructor(value: number) {
    if (!SamplePostCommentId.isValid(value)) {
      throw new TypeError(`${value} is an invalid value`)
    }

    this._value = value
  }

  get value(): number {
    return this._value
  }

  equals(to: SamplePostCommentId): boolean {
    return this._value === to.value
  }

  static isValid(value: number): boolean {
    return ValueObjectUtils.isNaturalNumber(value)
  }

  static from(value: unknown): SamplePostCommentId {
    return new this(Number(value))
  }
}
