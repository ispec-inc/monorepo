
export type UserAge = Readonly<number>

// constructor

export const createUserAge = (v: number): UserAge => {
  if (!v) {
    throw new RangeError('use age は必須です')
  }
  const castedAge = Number(v)

  if (Number.isNaN(castedAge)) {
    throw new RangeError('不正な値です')
  }

  if (castedAge < 14) {
    throw new RangeError('値は15以上の必要があります')
  }

  return castedAge
}
