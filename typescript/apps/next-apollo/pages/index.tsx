import { useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/02-advanced/sample'),
  { ssr: false }
)

const Home: NextPage = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>React Next Framework & Apollo Client</div>
      {count}
      <button onClick={() => setCount(count + 1)}>aaa</button>
      <DynamicComponentWithNoSSR />
    </>
  )
}

export default Home
