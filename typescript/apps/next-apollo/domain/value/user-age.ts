export type UserAge = Readonly<number>

// constructor
export const createUserAge = (v: number): UserAge => {
  if (!v) {
    throw new RangeError('age は必須です')
  }
  const castedNum = Number(v)
  if (Number.isNaN(castedNum)) {
    throw new RangeError('不正な値です')
  }
  if (castedNum < 0) {
    throw new RangeError('不正な値です')
  }

  return v
}
