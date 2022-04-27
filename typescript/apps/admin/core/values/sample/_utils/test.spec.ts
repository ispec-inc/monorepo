import { ValueObjectUtils } from "."
import { TestCase, testMultipleCases } from "~/utils/test-helper"

describe('core/values/_utils', () => {
  it('isNaturalNumber', () => {
    const cases: TestCase[] = [
      [ValueObjectUtils.isNaturalNumber(3), true],
      [ValueObjectUtils.isNaturalNumber(0), false],
      [ValueObjectUtils.isNaturalNumber(-1), false],
      [ValueObjectUtils.isNaturalNumber(3.1), false],
      [ValueObjectUtils.isNaturalNumber(NaN), false],
    ]

    testMultipleCases(cases, (result, expected) => {
      expect(result).toEqual(expected)
    })
  })
})
