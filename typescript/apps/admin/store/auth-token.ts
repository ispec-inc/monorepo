import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import { store } from '@/store'
import { LoginResponse } from '@monorepo/proto/admin/api/rest/v1/auth/auth_pb'
import { Auth } from '@monorepo/proto/admin/view/auth_pb'
import { AuthTokenModel } from '~/core/00-model/auth-token'

let preserveState = false

if (process.browser) {
  preserveState =
    !!localStorage.getItem('vuex') &&
    JSON.parse(localStorage.getItem('vuex') || '{}').auth_token
}

@Module({
  name: 'auth_token',
  dynamic: true,
  store,
  namespaced: true,
  preserveState,
})
export class AuthTokenModule extends VuexModule {
  private _token: AuthTokenModel | null = null

  @Mutation
  private SET_TOKEN(value: AuthTokenModel | null): void {
    this._token = value
  }

  @Action({ rawError: true })
  setToken(value: LoginResponse.Auth.AsObject | Auth.AsObject) {
    this.SET_TOKEN(
      new AuthTokenModel(
        value.accessToken
      )
    )
  }

  @Action({ rawError: true })
  clearToken() {
    this.SET_TOKEN(null)
  }

  get token(): AuthTokenModel | null {
    return this._token
  }

  get jwt(): string | null {
    return this._token?.accessToken || null
  }
}

export const authTokenModule = getModule(AuthTokenModule)
