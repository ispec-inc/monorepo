export class DomainModelBase<T> {
  readonly rawValue: T

  constructor(value: T) {
    this.rawValue = value
  }
}
