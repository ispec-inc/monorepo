import { Maybe } from "../advanced-types"

export function filterNull<T>(array: Maybe<T>[]): T[] {
  return array.filter((item) => item !== null) as T[]
}
