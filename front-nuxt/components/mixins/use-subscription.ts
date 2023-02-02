import { Vue, Component } from 'vue-property-decorator'
import { Subscription } from 'rxjs'

@Component
export default class UseSubscription extends Vue {
  protected readonly subscription = new Subscription()

  beforeDestroy() {
    this.subscription.unsubscribe()
  }
}
