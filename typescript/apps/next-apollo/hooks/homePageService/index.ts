import gql from 'graphql-tag'
import { useMemo } from 'react'
import HomePageQueryModel from '~/models/query-model/home-page-query-model'
import { useHomePageQuery } from '~/__generated__/graphql'

const _QUERY = gql`
  query HomePage {
    viewer {
      login
      repositories(first: 10, ownerAffiliations: OWNER) {
        pageInfo {
          hasNextPage
        }
        nodes {
          createdAt
          id
          name
          nameWithOwner
          owner {
            login
          }
          url
          description
        }
      }
    }
  }
`



export const useHomePageService = () => {
  const { data, loading, error, refetch } = useHomePageQuery()
  const queryModel = useMemo(() => data ? new HomePageQueryModel(data) : null, [data])

  return {
    queryModel,
    loading,
    error,
    refetch
  }

}

