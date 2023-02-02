export namespace ValueObjectUtils {
  export function isNaturalNumber(value: number): boolean {
    return !isNaN(value) && value === Math.floor(value) && value > 0
  }
}
