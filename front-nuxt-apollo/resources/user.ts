import Resource from '~/resources/resource'

type User = {
  id: number
  email: string
  password: string
}

export default class UserResource extends Resource {
  private data: User

  email: string
  password: string

  constructor(data: User) {
    super(data.id)
    this.data = data
    this.email = data.email || ''
    this.password = data.password || ''
  }
}
