import { User } from '~/types/model/user'
import { PersonName } from '~/types/person-name'
import { UserModelHelper } from '~/core/00-model/other/user/helper'

export interface IUserModel {
  id: string
  name: string
}

export class UserModel implements IUserModel {
  private readonly _id: string
  private readonly _name: string

  constructor(data: User) {
    this._id = data.id
    this._name = data.name
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get dividedName(): PersonName {
    return UserModelHelper.divideName(this._name)
  }
}
