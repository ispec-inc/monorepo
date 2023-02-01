import { IRepositoryPageQueryModel } from '~/pages/repositories/[owner]/[name]/query'
import { RepositoryPageQuery } from '~/__generated__/graphql'

export default class QueryRepositoryPageModel implements IRepositoryPageQueryModel {
  private readonly data: RepositoryPageQuery
  
  constructor(data: RepositoryPageQuery) {
    this.data = data
  }

  get repositoryId() {
    return this.data.repository?.id || ''
  }

  get nameWithOwner() {
    return this.data.repository?.nameWithOwner || ''
  }

  get issues() {
    return (this.data.repository?.issues.nodes ?? []).map(node => ({
      id: node?.id || '',
      title: node?.title || '',
      url: node?.url || ''
    }))
  }
}
