import { Context } from '@nuxt/types'
import snakeCaseKeys from 'snakecase-keys'
import camelCaseKeys from 'camelcase-keys'

export default function ({ $axios, store }: Context): void {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = store.$auth.getToken('local')
    config.headers.common['User-id'] = localStorage.getItem('userId')

    if (!config.data) {
      return config
    }
    const contentType = config.headers['content-type']
    if (contentType && contentType.includes('multipart')) {
      return config
    }
    const data = JSON.parse(typeof config.data === 'string' ? config.data : JSON.stringify(config.data))
    const snakeCaseData = snakeCaseKeys(data, { deep: true })
    return { ...config, data: snakeCaseData }
  })

  $axios.onResponse((res) => {
    if (!res.data) {
      return res
    }
    const data = JSON.parse(JSON.stringify(res.data))
    const camelCaseData = camelCaseKeys(data, { deep: true })
    return { ...res, data: camelCaseData }
  })

  $axios.onResponseError((error) => {
    const code = error.response?.status
    if (code === 401) {
      store.$auth.logout()
      store.$router.push('login')
    }
    throw error
  })
}
