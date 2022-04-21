import { Gender } from '../value/gender'
import { createUserAge } from '../value/user-age'
import { createUserEmail } from '../value/user-email'
import { createUserName, UserName } from '../value/user-name'

// domain model
export type User = Readonly<{
  userId: string,
  userName: UserName,
  gender: Gender
  age: number,
  email: string,
}>


// constructor
export const createUser = (userId: string, firstName: string, lastName: string, gender: Gender, age: number, email: string): User => {
  if (!userId) {
    throw new Error('不正なユーザーです')
  }
  return {
    userId,
    userName: createUserName(firstName, lastName),
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
