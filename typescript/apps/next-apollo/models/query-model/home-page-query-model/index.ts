import { HomePageQuery } from '~/__generated__/graphql'

export default class HomePageQueryModel {
  readonly data: HomePageQuery
  
  constructor(data: HomePageQuery) {
    this.data = data
  }

  get repositories() {
    return this.data.viewer.repositories.nodes
  }
}
