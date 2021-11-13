import { isNullOrUndefined } from "."

describe('util-functions/null-or-undefined', () => {
  it('isNullOrUndefined', () => {
    const cases: [result: boolean, expected: boolean][] = [
      [isNullOrUndefined(0), false],
      [isNullOrUndefined(''), false],
      [isNullOrUndefined(null), true],
      [isNullOrUndefined(undefined), true],
      [isNullOrUndefined(false), false],
      [isNullOrUndefined('null'), false],
    ]

    for (const c of cases) {
      const [result, expected] = c
      expect(result).toEqual(expected)
    }
  })
})