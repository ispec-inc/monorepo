import { Vue, Component } from 'nuxt-property-decorator'
import { Route } from 'vue-router'

@Component
export default class BeforeUnloadGuardMixin extends Vue {
  // 表示するメッセージ
  protected beforeUnloadGuardMessage = '入力した内容が失われる可能性があります。よろしいですか？';
  protected disableBlockUnload = false;

  created(): void {
    if (process.client) {
      window.addEventListener('beforeunload', this.checkWindow)
    }
  }

  beforeDestroy(): void {
    window.removeEventListener('beforeunload', this.checkWindow)
  }

  protected checkWindow(event: BeforeUnloadEvent): void {
    if (this.disableBlockUnload) {
      return
    }
    event.preventDefault()
    event.returnValue = this.beforeUnloadGuardMessage
  }

  beforeRouteLeave(_to: Route, _from: Route, next: Function): void {
    if (this.disableBlockUnload) {
      next()
      return
    }
    const answer = window.confirm(this.beforeUnloadGuardMessage)
    next(answer)
  }
}
