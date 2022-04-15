import { NextPage } from 'next'
import { gql } from '@apollo/client'
import { useRepositoryPageQuery, useCreateIssueMutation } from '~/__generated__/graphql'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const QUERY = gql`
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

const MUTATION = gql`
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

const Home: NextPage = () => {
  const router = useRouter()
  const { data, loading, error, refetch } = useRepositoryPageQuery({
    variables: {
      name: String(router.query.name),
      owner: String(router.query.owner),
    },
  })
  const [issueTitle, setIssueTitle] = useState('')

  const [createIssueMutation, createIssueResponse] = useCreateIssueMutation()

  const createIssue = () => {
    createIssueMutation({
      variables: {
        input: {
          repositoryId: data?.repository?.id || '',
          title: issueTitle,
        }
      }

    })
  }

  useEffect(() => {
    refetch()
  }, [createIssueResponse])

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
      <div className="flex flex-col justify-center items-center h-full w-full">
        id: {data?.repository?.id} <br/>
        owner/name: {data?.repository?.nameWithOwner}
        <div>issues</div>
        <ul>
          {data?.repository?.issues.nodes?.map(issue => {
            return (
              <li key={issue?.id}><div>
                title: {issue?.title}<br/>
                url: <a href={issue?.url}>{issue?.url}</a><br/>
              </div></li>
            )
          })}
        </ul>
        <div>title: {issueTitle}</div>
        <input type="text" value={issueTitle} onChange={e => setIssueTitle(e.target.value)} />
        <button onClick={createIssue}>create PR</button>
      </div>
    </>
  )
}

export default Home
