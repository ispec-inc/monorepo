<template>
  <div>
    <div>トップ</div>
    <div>
      {{ articleList }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import articleModule from '@/store/article'
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

  callApi(id: number) {
    this.gateway.fetchById(id).then((res) => {
      console.log('response', res)
    })
  }
}
</script>
