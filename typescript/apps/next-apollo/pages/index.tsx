import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useHomePageService } from '~/hooks/homePageService'

const Home: NextPage = () => {
  const router = useRouter()
  const { queryModel, loading, error } = useHomePageService()

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
