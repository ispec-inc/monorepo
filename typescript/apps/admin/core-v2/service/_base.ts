export abstract class ServiceBase<T> {
  protected readonly gatewayHub: T

  constructor(gatewayHub: T) {
    this.gatewayHub = gatewayHub
  }
}
