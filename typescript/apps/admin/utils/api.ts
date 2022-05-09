import { NuxtAxiosInstance } from '@nuxtjs/axios'
import aspida from "@aspida/axios"
import { AxiosInstance } from 'axios'
import api, { ApiInstance } from '~/api/$api'

// eslint-disable-next-line import/no-mutable-exports
let $axios: NuxtAxiosInstance
// eslint-disable-next-line import/no-mutable-exports
let client: ApiInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance): void {
  $axios = axiosInstance
  client = api(aspida($axios as AxiosInstance)) as ApiInstance
}

export { $axios, client }
