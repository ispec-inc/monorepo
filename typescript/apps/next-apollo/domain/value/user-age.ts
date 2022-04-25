export type UserAge = Readonly<number>

// constructor
const useAgeMinLimit = 15

export const createUserAge = (v: number): UserAge => {
  if (!v) {
    throw new RangeError('use age は必須です')
  }
  const castedAge = Number(v)

  if (Number.isNaN(castedAge)) {
    throw new RangeError('不正な値です')
  }

  if (castedAge < useAgeMinLimit) {
    throw new RangeError(`値は${useAgeMinLimit}以上の必要があります`)
  }

  return castedAge
}
