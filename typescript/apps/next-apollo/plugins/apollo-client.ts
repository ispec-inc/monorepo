import fetch from 'cross-fetch'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    uri: `${process.env.NEXT_PUBLIC_GITHUB_API_URL}/graphql`,
    // TODO: uri の読み込み方要検討
    fetch,
  }),
})

export default client
