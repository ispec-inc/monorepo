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
        __typename
      }
    }
  }
`

export const useCreateIssueService = (onCompleted: () => void) => {
  const [createIssueMutation, createIssueResponse] = useCreateIssueMutation({
    onCompleted: onCompleted,
  })

  const createIssue = (mutationModel: CreateIssueMutateModel) => {
    createIssueMutation({ variables: mutationModel.variables() })
  }

  return {
    createIssue,
    createIssueResponse
  }

}

