import { gql } from '@apollo/client'
import { useMemo } from 'react'
import RepositoryPageQueryModel from '~/models/query-model/repository-page-query-model'
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
  const queryModel = useMemo(() => data ? new RepositoryPageQueryModel(data) : null, [data])

  return {
    queryModel,
    loading,
    error,
    refetch
  }

}

