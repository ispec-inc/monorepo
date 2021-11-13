
type _FilterKeysByType<T, U extends keyof T, V> = U extends any ? T[U] extends V ? U : never : never

export type FilterKeysByType<T, U> = _FilterKeysByType<T, keyof T, U>

