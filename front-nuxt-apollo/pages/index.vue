<template>
  <div>
    <div>トップ</div>
    <div>
      {{ articleList }}
    </div>
    <v-btn @click="addSuccessSnackbar">
      add success snackbar
    </v-btn>
    <v-btn @click="addErrorSnackbar">
      add error snackbar
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import articleModule from '@/store/article'
import { GlobalEventBus } from '~/surface/event-bus/global'
import { SampleGatewayImpl } from '~/core/sample/gateway'

@Component({})
export default class TopPage extends Vue {
  gateway = new SampleGatewayImpl()

  created(): void {
    articleModule.fetch()

    this.callApi(1)

    setTimeout(() => {
      this.callApi(1)
    }, 1000)

    setTimeout(() => {
      this.callApi(2)
    }, 2000)
  }

  get articleList(): unknown[] {
    return articleModule.articles
  }

  addSuccessSnackbar(): void {
    GlobalEventBus.getInstance().dispatchSnackbarEvent({
      message: 'sample',
      type: 'success'
    })
  }

  addErrorSnackbar(): void {
    GlobalEventBus.getInstance().dispatchSnackbarEvent({
      message: 'error',
      type: 'error'
    })
  }

  callApi(id: number): void {
    this.gateway.fetchById(id).then((res) => {
      console.log('response', res)
    })
  }
}
</script>
