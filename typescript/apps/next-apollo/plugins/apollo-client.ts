import { ApolloClient, InMemoryCache } from '@apollo/client'

console.debug('いつ実行されんの?')

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${process.env.NEXT_PUBLIC_SERVER_API_URL}/graphql`,
})

export default client
