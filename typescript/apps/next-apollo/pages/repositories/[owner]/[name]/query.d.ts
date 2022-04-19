export interface IRepositoryPageQueryModel {
  readonly repositoryId: string
  readonly nameWithOwner: string
  readonly issues: Issue[]
}

type Issue = {
  id: string
  title: string
  url: string
}
