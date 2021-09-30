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
import { pageServicesModule } from '~/store/page-services'

@Component({
  components: {
    IndexContainer,
  },
})
export default class SamplePage extends Vue {
  readonly service: SampleArticleIndexPageService = pageServicesModule.getService('sampleArticle')
}
</script>
