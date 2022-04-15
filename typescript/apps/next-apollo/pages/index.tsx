import { NextPage } from 'next'
import { gql } from '@apollo/client'
import { useHomePageQuery } from '~/__generated__/graphql'
import { useRouter } from 'next/router'

const QUERY = gql`
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

const Home: NextPage = () => {
  const router = useRouter()
  const { data, loading, error } = useHomePageQuery({
    variables: {},
  })

  const onClickRepository = (nameWithOwner: string) =>
    () =>
      router.push(`/repositories/${nameWithOwner}`)

  if (loading) {
    return (
      <h2>
        Loading...
      </h2>
    )
  }

  if (error) {
    console.error(error)
    return null
  }

  console.log(data)

  return (
    <>
      <div>React Next Framework & Apollo Client</div>
      <div className="flex flex-col items-center justify-center h-full">
        {data?.viewer.repositories.nodes?.map((value) => (
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
    </>
  )
}

export default Home
