export abstract class ServiceBase<T> {
  protected readonly repositories: T

  constructor(repositories: T) {
    this.repositories = repositories
  }
}
