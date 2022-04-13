import { ErrorModelHelper } from './helper'
describe('error-model', () => {
  it('status code to Japanese message', () => {
    const notFound = ErrorModelHelper.statusCode2JpMessage(404)
    const expected = 'ファイルが見つかりませんでした'
    expect(notFound).toBe(expected)
  })

  it('status code to Japanese message/undefined', () => {
    const notFound = ErrorModelHelper.statusCode2JpMessage(0)
    const expected = null
    expect(notFound).toBe(expected)
  })
})
