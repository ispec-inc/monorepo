import { Context } from '@nuxt/types'
import { AxiosError } from 'axios'
import snakeCaseKeys from 'snakecase-keys'
import camelCaseKeys from 'camelcase-keys'

export default function ({ $axios, store }: Context) {
  $axios.onRequest((config) => {
    if (!store.$auth.loggedIn) {
      return config
    }
    config.headers.common.Authorization = store.$auth.getToken('local')
    config.headers.common['User-id'] = localStorage.getItem('userId')
    return { ...config }
  })
  $axios.onRequest((config) => {
    if (!config.data) {
      return config
    }
    const contentType = config.headers['content-type']
    if (contentType && contentType.includes('multipart')) {
      return config
    }
    const data = JSON.parse(JSON.stringify(config.data))
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

  $axios.onResponseError((error: AxiosError) => {
    const code = error.response?.status
    store.dispatch('error/addError', {
      message: error.response?.data?.error || 'exception occurred',
      status: code,
    })
    if (code === 401) {
      store.$auth.logout()
      store.$router.push('login')
    }
    throw error
  })
}
