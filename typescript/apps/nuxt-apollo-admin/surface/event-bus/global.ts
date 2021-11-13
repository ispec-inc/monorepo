import { Subject } from 'rxjs'
import { SnackbarData } from '~/types/snackbar-container'

export class GlobalEventBus {
  private static instance: GlobalEventBus | null = null

  readonly snackbarEventStream: Subject<Omit<SnackbarData, 'id'>>

  private constructor() {
    this.snackbarEventStream = new Subject<Omit<SnackbarData, 'id'>>()
  }

  static getInstance(): GlobalEventBus {
    if (!GlobalEventBus.instance) {
      const ins = new GlobalEventBus()
      GlobalEventBus.instance = ins
      return ins
    }

    return GlobalEventBus.instance
  }

  dispatchSnackbarEvent(data: Omit<SnackbarData, 'id' | 'duration'>, duration: number = 3000) {
    this.snackbarEventStream.next({ ...data, duration })
  }
}
