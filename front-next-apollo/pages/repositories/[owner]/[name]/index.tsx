import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRepositoryPageService } from '~/hooks/repository-page-service'
import { useCreateIssueService } from '~/hooks/craete-issue-service'
import MutateCreateIssueModel from '~/models/mutate/mutate-create-issue'

export interface IRepositoryPageQueryModel {
  readonly repositoryId: string
  readonly nameWithOwner: string
  readonly issues: Array<{
    id: string
    title: string
    url: string
  }>
}

const RepositoryPage: NextPage = () => {
  const router = useRouter()
  const { queryModel, loading, error, refetch } = useRepositoryPageService(
    String(router.query.owner),
    String(router.query.name),
  )
  const { createIssue } = useCreateIssueService(refetch)

  const [issueTitle, setIssueTitle] = useState('')

  const createNewIssue = () => {
    createIssue(
      new MutateCreateIssueModel(queryModel?.repositoryId || '', issueTitle)
    )
  }

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col">
          <p className="mb-4">
            id: {queryModel?.repositoryId} <br/>
            owner/name: {queryModel?.nameWithOwner}
          </p>
          <div>issues</div>
          <ul className="flex flex-col gap-3 mb-4">
            {
              loading
                ? <h2>Loading...</h2>
                : queryModel?.issues.map(issue => {
                  return (
                    <div key={issue.id} className="bg-white/[.4] p-5 rounded">
                    title: {issue.title}<br/>
                    url: <a href={issue.url}>{issue.url}</a><br/>
                    </div>
                  )
                })
            }
            { error && <div>{ error }</div> }
          </ul>
          <div>title: {issueTitle}</div>
          <input type="text" value={issueTitle} onChange={e => setIssueTitle(e.target.value)} className="mt-3"/>
          <button onClick={createNewIssue} className="mt-3">create issue</button>
          <button onClick={() => { router.push('/') }} className="mt-3">Back to index</button>
        </div>
      </div>
    </>
  )
}

export default RepositoryPage
