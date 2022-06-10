export type UserName = Readonly<{
  firstName: string
  lastName: string
}>

// constructor
export const createUserName = (firstName: string, lastName: string): UserName => {
  return {
    firstName: createFirstName(firstName),
    lastName: createLastName(lastName),
  }
}

const firstNameMaxLength = 12
const lastNameMaxLength = 12

export const createFirstName = (v: string): string => {
  if (!v) {
    throw new RangeError('firstName は必須です')
  }
  if (v.length > firstNameMaxLength) {
    throw new RangeError(`firstName は${firstNameMaxLength}文字以下で入力してください`)
  }

  return v

}


export const createLastName = (v: string): string => {
  if (!v) {
    throw new RangeError('lastName は必須です')
  }
  if (v.length > lastNameMaxLength) {
    throw new RangeError(`lastName は${lastNameMaxLength}文字以下で入力してください`)
  }

  return v

}
