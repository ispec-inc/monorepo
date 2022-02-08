export abstract class ServiceBase<T> {
  protected readonly usecases: T

  constructor(usecases: T) {
    this.usecases = usecases
  }
}
