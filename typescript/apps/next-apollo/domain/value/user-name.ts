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

export const createFirstName = (v: string): string => {
  if (!v) {
    throw new RangeError('firstName は必須です')
  }
  if (v.length > 13) {
    throw new RangeError('firstName は12文字以下で入力してください')
  }

  return v

}

export const createLastName = (v: string): string => {
  if (!v) {
    throw new RangeError('lastName は必須です')
  }
  if (v.length > 13) {
    throw new RangeError('lastName は12文字以下で入力してください')
  }

  return v

}
