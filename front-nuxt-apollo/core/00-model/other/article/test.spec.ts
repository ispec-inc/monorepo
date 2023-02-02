import { ArticleModelHelper } from '~/core/00-model/other/article/helper'

describe('article model', () => {
  it('pairing id title', () => {
    const id = '12345678'
    const title = 'test title'
    const expected = {
      id: '12345678',
      title: 'test title'
    }

    expect(ArticleModelHelper.pairIdTitle(id, title)).toEqual(expected)
  })

  it('create content', () => {
    const title = 'test title'
    const body = 'This is body.'
    const expected = {
      title: 'test title',
      body: 'This is body.'
    }

    expect(ArticleModelHelper.createContent(title, body)).toEqual(expected)
  })
})
