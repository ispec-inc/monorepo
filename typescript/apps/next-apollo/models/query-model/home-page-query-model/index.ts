import { IHomePageQueryModel } from '~/pages/query'
import { HomePageQuery } from '~/__generated__/graphql'

export default class HomePageQueryModel implements IHomePageQueryModel {
  private readonly data: HomePageQuery
  
  constructor(data: HomePageQuery) {
    this.data = data
  }

  get repositories() {
    return (this.data.viewer.repositories.nodes ?? []).map(node => ({
      id: node?.id || '',
      nameWithOwner: node?.nameWithOwner || '',
      createdAt: node?.createdAt || ''
    }))
  }
}
