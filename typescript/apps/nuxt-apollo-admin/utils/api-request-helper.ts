import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { $axios } from './api'
import { ModifyType } from '~/types/advanced'

export namespace ApiRequestHelper {
  export const ApiBaseUrl = {
    Admin: '/admin/v1',
  } as const
  export type ApiBaseUrlType = typeof ApiBaseUrl[keyof typeof ApiBaseUrl]

  type MethodNames = keyof Pick<
    NuxtAxiosInstance,
    'post' | 'put' | 'get' | 'delete'
  >
  type SimpleMethodNames = Extract<MethodNames, 'get' | 'delete'>
  type WithDataBodyMethodNames = Extract<MethodNames, 'post' | 'put'>
  type ConfigType<T> = ModifyType<AxiosRequestConfig, { params: T }>

  export type SimpleRequest = <T>() => Promise<AxiosResponse<T>>
  export type WithBodyRequest = <T, U>(body: U) => Promise<AxiosResponse<T>>

  type ConditionalMethodName<T> = T extends SimpleRequest
    ? SimpleMethodNames
    : WithDataBodyMethodNames
  type TFProvider<T extends SimpleRequest | WithBodyRequest> = <U>(
    url: string,
    method: ConditionalMethodName<T>,
    config?: ConfigType<U>
  ) => T

  export type SetConfigFunction<T extends SimpleRequest | WithBodyRequest> = <
    U
  >(
    config?: ConfigType<U>
  ) => T
  export type CFProvider = <T extends SimpleRequest | WithBodyRequest>(
    url: string,
    method: ConditionalMethodName<T>,
    tfProvider: TFProvider<T>
  ) => SetConfigFunction<T>
  export type SelectMethod = {
    [P in MethodNames]: SetConfigFunction<
      P extends SimpleMethodNames ? SimpleRequest : WithBodyRequest
    >
  }
  export type SetUrlFunction = (url: string) => SelectMethod
  export type SetBaseUrlFunction = (url: ApiBaseUrlType) => SetUrlFunction

  export type OmitPagination<T> = Omit<T, 'offset' | 'limit'>

  export const request: SetBaseUrlFunction = (
    baseUrl: ApiBaseUrlType
  ): SetUrlFunction => {
    return (url: string): SelectMethod => {
      const fullUrl = baseUrl + url
      const cfProvider: CFProvider = <
        T extends SimpleRequest | WithBodyRequest
      >(
        url: string,
        method: ConditionalMethodName<T>,
        tfProvider: TFProvider<T>
      ): SetConfigFunction<T> => {
        return <U>(config?: ConfigType<U>): T => {
          return tfProvider<U>(url, method, config)
        }
      }

      const simpleTFProvider: TFProvider<SimpleRequest> = <T>(
        url: string,
        method: SimpleMethodNames,
        config?: ConfigType<T>
      ): SimpleRequest => {
        return <T>(): Promise<AxiosResponse<T>> => {
          return $axios[method]<T>(url, config)
        }
      }

      const withBodyTFProvider: TFProvider<WithBodyRequest> = <T>(
        url: string,
        method: WithDataBodyMethodNames,
        config?: ConfigType<T>
      ): WithBodyRequest => {
        return <T, U>(body: U): Promise<AxiosResponse<T>> => {
          return $axios[method]<T>(url, body, config)
        }
      }

      return {
        get: cfProvider<SimpleRequest>(fullUrl, 'get', simpleTFProvider),
        delete: cfProvider<SimpleRequest>(fullUrl, 'delete', simpleTFProvider),
        post: cfProvider<WithBodyRequest>(fullUrl, 'post', withBodyTFProvider),
        put: cfProvider<WithBodyRequest>(fullUrl, 'put', withBodyTFProvider),
      }
    }
  }
}
