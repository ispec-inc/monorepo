export class AsyncProcessHelper<T, U extends unknown[]> {
  private _isAwaitingResponse = false
  private readonly asyncFn: (...args: U) => Promise<T>

  constructor(asyncFn: (...args: U) => Promise<T>) {
    this.asyncFn = asyncFn
  }

  run(...args: U): Promise<T> {
    this._isAwaitingResponse = true

    return this.asyncFn(...args)
      .finally(() => {
        this._isAwaitingResponse = false
      })
  }

  get isAwaitingResponse(): boolean {
    return this._isAwaitingResponse
  }

}
