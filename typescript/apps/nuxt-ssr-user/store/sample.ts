import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import { store } from '@/store'
import { $axios } from '@/utils/api'

/**
 * In the case of BFFs, the API is tied to the Page, so the response's interface is defined in Store and the model that be used in interface is called from /models.
 * If not, the response is defined in models.
 * BFFの場合はAPIとPageが紐づくため、Storeでresponseのinterfaceを定義し、modelsからmodelを呼び出して使う。
 * そうでない場合は、レスポンスはmodelsで定義
*/

@Module({ name: 'sampleModule', store, dynamic: true, namespaced: true , stateFactory: true })
export class SampleModule extends VuexModule {
  private sampleState: Array<any> = []

  @Mutation
  private SET_RESPONSE(value: Array<any>): void {
    this.sampleState = value
  }

  @Action({rawError: true})
  public fetch(): Promise<void> {
    return new Promise<void>(( resolve, reject) => {
      $axios.$get<Array<any>>('https://api.github.com/orgs/ispec-inc/repos')
        .then((response: any) => {
          this.SET_RESPONSE(response)
          resolve()
        })
        .catch((apiError: any) => {
          reject(apiError)
        })
    })
  }

  @Action( {rawError: true})
  public setResponse(value: Array<any>) {
    this.SET_RESPONSE(value)
  }

  @Action( {rawError: true})
  public setFirstResponse(value: any) {
    this.SET_RESPONSE([value, ...this.response.slice(1)])
  }

  public get response(): Array<any> {
    return JSON.parse(JSON.stringify(this.sampleState))
  }

  public get firstResponse(): any {
    return JSON.parse(JSON.stringify(this.sampleState[0]))
  }
}

const sampleModule = getModule(SampleModule)
export default sampleModule

