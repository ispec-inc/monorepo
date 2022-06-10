import gql from 'graphql-tag'
import { useMemo } from 'react'
import QueryRepositoryPageModel from '~/models/query/query-repository-page'
import { useRepositoryPageQuery } from '~/__generated__/graphql'

const _QUERY = gql`
  query RepositoryPage($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      nameWithOwner
      issues(first: 10) {
        nodes {
          id
          title
          url
          __typename
        }
      }
    }
  }
`

export const useRepositoryPageService = (owner: string, name: string) => {
  const { data, loading, error, refetch } = useRepositoryPageQuery({
    variables: {
      name,
      owner,
    },
  })
  const queryModel = useMemo(() => data ? new QueryRepositoryPageModel(data) : null, [data])

  return {
    queryModel,
    loading,
    error,
    refetch
  }

}

