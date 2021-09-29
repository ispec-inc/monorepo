export function filterNull<T>(array: (T | null)[]): T[] {
  return array.filter((item) => item !== null) as T[]
}
