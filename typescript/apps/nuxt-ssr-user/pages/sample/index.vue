<template>
  <div>
    <h1>サンプルページ</h1>
    <index-container></index-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import IndexContainer from '@/components/containers/index-container/index.vue'
import { SampleArticleIndexPageService } from '~/core/03-service/sample/article'
import { SampleArticleRepositoryImpl } from '~/core/02-repository/sample/article'
import { SampleArticleGatewayImpl } from '~/core/01-gateway/sample/article'

@Component({
  components: {
    IndexContainer,
  },
})
export default class SamplePage extends Vue {
  readonly service = new SampleArticleIndexPageService(new SampleArticleRepositoryImpl(new SampleArticleGatewayImpl()))

  created() {
    this.service.fetch()
  }
}
</script>
