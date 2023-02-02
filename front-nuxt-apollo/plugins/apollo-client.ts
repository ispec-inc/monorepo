import { ApolloClient, HttpLink, InMemoryCache, from, ApolloLink } from '@apollo/client'
import { Context } from '@nuxt/types'
import { onError } from '@apollo/client/link/error'
import type { ServerError } from '@apollo/client/link/utils'
import { initializeApollo } from '~/utils/apollo'

export default function({ error, store }: Context): void {
  const httpLink = new HttpLink({ uri: 'http://localhost:9000/graphql' })

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        // authorization: localStorage.getItem('token') || null
        authorization: '123456789'
      }
    }))

    return forward(operation)
  })

  const logoutLink = onError(({ networkError }) => {
    if (networkError && (networkError as ServerError).statusCode === 401) {
      error(networkError)
      store.$router.push('/login').then()
    }
  })

  const dataProcessingLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      return response
    })
  })

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      authMiddleware,
      logoutLink,
      dataProcessingLink,
      httpLink
    ])
  })

  initializeApollo(apolloClient)
}
