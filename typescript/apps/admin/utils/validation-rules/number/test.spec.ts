import { numberRules } from "."
import { TestCase, testMultipleCases } from "~/utils/test-helper"

describe('utils/validation-rules/number', () => {
  it('numberRules/required', () => {
    const cases: TestCase[] = [
      [numberRules.required(20), true],
      [numberRules.required(0), true],
      [numberRules.required(undefined), '入力してください'],
    ]
    testMultipleCases(cases, (result, expected) => {
      expect(result).toEqual(expected)
    })
  })

  it('numberRules/numeric', () => {
    const cases: TestCase[] = [
      [numberRules.numeric(20), true],
      [numberRules.numeric(0), true],
      [numberRules.numeric(-1), true],
      [numberRules.numeric(1e219372), '入力が不正です'],
      [numberRules.numeric(undefined), true],
    ]
    testMultipleCases(cases, (result, expected) => {
      expect(result).toEqual(expected)
    })
  })

  it('numberRules/positive', () => {
    const cases: TestCase[] = [
      [numberRules.positive(20), true],
      [numberRules.positive(0), true],
      [numberRules.positive(-1), '正の数で入力してください'],
      [numberRules.positive(undefined), true],
    ]
    testMultipleCases(cases, (result, expected) => {
      expect(result).toEqual(expected)
    })
  })

  it('numberRules/safeMax', () => {
    const cases: TestCase[] = [
      [numberRules.safeMax(20), true],
      [numberRules.safeMax(Number.MAX_SAFE_INTEGER), `${Number.MAX_SAFE_INTEGER}未満で入力してください`],
      [numberRules.safeMax(undefined), true],
    ]
    testMultipleCases(cases, (result, expected) => {
      expect(result).toEqual(expected)
    })
  })
})
