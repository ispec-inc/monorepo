export class NaturalNumber {
  readonly value: number

  constructor(value: number) {
    if (isNaN(value) || value !== Math.floor(value) || value <= 0) {
      throw new TypeError(`${value} is not a natural number`)
    }

    this.value = value
  }

  equals(to: NaturalNumber): boolean {
    return this.value === to.value
  }

  static from(value: unknown): NaturalNumber {
    return new this(Number(value))
  }
}
