export type GetIndexType<T> = T extends Array<any> ? number : keyof T
export type Maybe<T> = T | null
