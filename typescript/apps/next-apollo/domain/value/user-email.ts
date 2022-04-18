export type UserEmail = Readonly<string>

// constructor

export const createUserEmail = (v: string): UserEmail => {
  if (!v) {
    throw new RangeError('email は必須です')
  }
  const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/
  if (!pattern.test(v)) {
    throw new RangeError('不正なメールアドレスです')
  }

  return v
}
