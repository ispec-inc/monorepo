import { gql } from '@apollo/client'
import CreateIssueMutateModel from '~/models/mutate/mutate-create-issue'
import { useCreateIssueMutation } from '~/__generated__/graphql'

const _MUTATION = gql`
  mutation createIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      issue {
        id
        title
        url
      }
    }
  }
`

export const useCreateIssueService = () => {
  const [createIssueMutation, createIssueResponse] = useCreateIssueMutation()

  const createIssue = (mutationModel: CreateIssueMutateModel) => {
    createIssueMutation({ variables: mutationModel.asObject() })
  }

  return {
    createIssue,
    createIssueResponse
  }

}

