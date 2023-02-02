import { Auth } from 'nuxtjs__auth'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth
  }
}
