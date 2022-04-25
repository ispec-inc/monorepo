import { CreateIssueMutationVariables } from '~/__generated__/graphql'

export default class MutateCreateIssueModel {
  private readonly repositoryId: string
  private readonly title: string
  
  constructor(repositoryId: string, title: string) {
    this.repositoryId = repositoryId
    this.title = title
  }

  variables(): CreateIssueMutationVariables {
    return {
      input: {
        repositoryId: this.repositoryId,
        title: this.title
      }
    }
  }
}
