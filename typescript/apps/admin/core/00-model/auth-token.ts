export class AuthTokenModel {
  readonly accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }
}
