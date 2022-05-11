import { Gender } from './gender'
import { createUserAge } from './age'
import { createUserEmail } from './email'
import { createUserName, UserName } from './user-name'

// domain model
export type User = Readonly<{
  userId: string,
  userName: UserName,
  gender: Gender
  age: number,
  email: string,
}>


// constructor
/*
 * ユースケースごとにファクトリが異なるので、適切な名前をつけて分ける
 */

export const initSignupUser = (factoryData: {
  firstName: string,
  lastName: string,
  gender: Gender
  age: number,
  email: string,
}): User => {
  const { firstName, lastName, gender, age, email } = factoryData
  return {
    userId: '',
    userName: createUserName(firstName, lastName),
    gender,
    age: createUserAge(age),
    email: createUserEmail(email),
  }
}

/*
 * APIのデータがそのまま使えそうなときなどは
 * initInviteUser(response.user)
 * や
 * const firstUser = initInviteUser(data)
 * const secondUser = initInviteUser({ ...firstUser, email: 'hoge@hoge.hoge' })
 * みたいなことができるように、適宜使いやすくpropは設定する。
 */

export const initInviteUser = (factoryData: {
  userId: string,
  userName: UserName,
  firstName: string,
  lastName: string,
  gender: Gender
  age: number,
  email: string,
}): User => {
  const { userId, userName, gender, age, email } = factoryData
  if (!userId) {
    throw new Error('不正なユーザーです')
  }
  // ファクトリロジックが存在するものは全て検証する。
  // Genderは検証のしようがないのでやらない
  return {
    userId,
    userName: createUserName(
      userName.firstName,
      userName.lastName
    ),
    gender,
    age: createUserAge(age),
    email: createUserEmail(email),
  }
}

// Behavior
export const changeEmail = (user: User, email: string): User => {
  return {
    ...user,
    email: createUserEmail(email)
  }
}

export const isSignuped = (user: User): boolean => {
  return !!user.userId
}
