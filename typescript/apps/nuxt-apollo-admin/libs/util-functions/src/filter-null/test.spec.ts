import { filterNull } from "."

describe('util-functions/filter-null', () => {
  it('filterNull', () => {
    const result = filterNull([false, 0, 1, 2, null, 4, undefined])
    const expected = [false, 0, 1, 2, 4, undefined]

    expect(result).toEqual(expected)
  })
})