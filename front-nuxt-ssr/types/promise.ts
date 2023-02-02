export namespace PromiseType {
  export type Resolve<T> = (value: T | PromiseLike<T>) => void
  export type Reject = (reason?: unknown) => void
}
