<template>
  <div>
    <div>トップ</div>
    <div>
      {{ articleList }}
    </div>
    <v-btn @click="addSuccessSnackbar">add success snackbar</v-btn>
    <v-btn @click="addErrorSnackbar">add error snackbar</v-btn>
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

  created() {
    articleModule.fetch()

    this.callApi(1)

    setTimeout(() => {
      this.callApi(1)
    }, 1000)

    setTimeout(() => {
      this.callApi(2)
    }, 2000)
  }

  get articleList() {
    return articleModule.articles
  }

  addSuccessSnackbar() {
    GlobalEventBus.getInstance().dispatchSnackbarEvent({
      message: 'sample',
      type: 'success',
    })
  }

  addErrorSnackbar() {
    GlobalEventBus.getInstance().dispatchSnackbarEvent({
      message: 'error',
      type: 'error',
    })
  }

  callApi(id: number) {
    this.gateway.fetchById(id).then((res) => {
      console.log('response', res)
    })
  }
}
</script>
