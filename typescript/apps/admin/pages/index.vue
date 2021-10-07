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
import { SampleInterface } from '~/models/sample'

@Component({})
export default class TopPage extends Vue {
  created(): void {
    articleModule.fetch()
  }

  get articleList(): SampleInterface[] {
    return articleModule.articles
  }
}
</script>
