/* eslint-disable */
// prettier-ignore
import { Plugin } from '@nuxt/types'

// prettier-ignore
type Query0 = {
  userId: number
}

// prettier-ignore
export const pagesPath = {
  README: {
    $url: (url?: { hash?: string }) => ({ path: '/README', hash: url?.hash })
  },
  sample: {
    form: {
      $url: (url?: { hash?: string }) => ({ path: '/sample/form', hash: url?.hash })
    },
    separated_form: {
      $url: (url?: { hash?: string }) => ({ path: '/sample/separated-form', hash: url?.hash })
    },
    $url: (url: { query: Query0, hash?: string }) => ({ path: '/sample', query: url.query as any, hash: url.hash })
  },
  $url: (url?: { hash?: string }) => ({ path: '/', hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath

// prettier-ignore
declare module 'vue/types/vue' {
  interface Vue {
    $pagesPath: PagesPath
  }
}

// prettier-ignore
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $pagesPath: PagesPath
  }

  interface Context {
    $pagesPath: PagesPath
  }
}

// prettier-ignore
declare module 'vuex/types/index' {
  interface Store<S> {
    $pagesPath: PagesPath
  }
}

// prettier-ignore
const pathPlugin: Plugin = (_, inject) => {
  inject('pagesPath', pagesPath)
}

// prettier-ignore
export default pathPlugin
