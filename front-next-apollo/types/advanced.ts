export type ModifyType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends { [key: string]: any },
  U extends Partial<Record<keyof T, unknown>>
> = { [P in keyof T]: P extends keyof U ? U[P] : T[P] }

export type Maybe<T> = T | null
