export interface IHomePageQueryModel {
  repositories: Repository[]
}

export type Repository = {
  id: string
  nameWithOwner: string
  createdAt: string
}
