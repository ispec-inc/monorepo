import { Subscription, Subject } from 'rxjs'

export class Stream<T> extends Subject<T> {
  subscribeAsDisposable(next?: (value: T) => void): Disposable {
    return new Disposable(this.subscribe(next))
  }
}

class Disposable {
  private readonly _subscription: Subscription

  constructor(subscription: Subscription) {
    this._subscription = subscription
  }

  disposedBy(bag: Subscription): void {
    bag.add(this._subscription)
  }
}
