import { Auth } from 'nuxtjs__auth'
import { DocumentNode } from 'graphql'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth
  }
}

declare module '*.gql' {
  const content: DocumentNode
  export default content
}

declare module '*.graphql' {
  const content: DocumentNode
  export default content
}
