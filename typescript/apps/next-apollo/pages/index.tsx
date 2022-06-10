import gql from 'graphql-tag'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import QueryHomePageModel from '~/models/query/query-home-page'
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

export interface IHomePageQueryModel {
  repositories: Array<{
    id: string
    nameWithOwner: string
    createdAt: string
  }>
}

const Home: NextPage = () => {
  const router = useRouter()
  const { data, loading, error } = useHomePageQuery()
  const queryModel = useMemo(() => data ? new QueryHomePageModel(data) : null, [data])

  const onClickRepository = (nameWithOwner: string) =>
    () =>
      router.push(`/repositories/${nameWithOwner}`)

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5" >
      <h2>Next Framework & Apollo Client</h2>
      {
        loading 
          ? <h2>Loading...</h2>
          : (
            <div className="flex flex-col items-center">
              {queryModel?.repositories.map((value) => (
                <div
                  key={value?.id}
                  p="x-5p y-6p"
                  text="19p warn"
                  cursor="pointer"
                  onClick={onClickRepository(value?.nameWithOwner || '')} 
                >
                  {value?.nameWithOwner}: created at {value?.createdAt}
                </div>
              ))}
            </div>
          )
      }
      { error && <div>{ error }</div> }
    </div>
  )
}

export default Home
