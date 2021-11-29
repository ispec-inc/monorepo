import { UserModelHelper } from '~/core/00-model/other/user/helper'

describe('user model', () => {
  it('divide name', () => {
    const name = '高波 航太'
    const expected = {
      first: '航太',
      last: '高波'
    }

    expect(UserModelHelper.divideName(name)).toEqual(expected)
  })
})
