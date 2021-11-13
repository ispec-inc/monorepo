export type Maybe<T> = T | null

export type SelectOption<T> = {
  text: string
  value: T
}

export type UnpackPromise<T> = T extends Promise<infer R> ? R : never