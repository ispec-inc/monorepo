import { ApolloClient } from '@apollo/client'

// eslint-disable-next-line import/no-mutable-exports
let apollo: ApolloClient<unknown>

export function initializeApollo(axiosInstance: ApolloClient<unknown>): void {
  apollo = axiosInstance
}

export { apollo }
