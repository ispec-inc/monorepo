<template>
  <div>
    <h1>サンプルページ</h1>
    <index-container></index-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import IndexContainer from '@/components/containers/index-container/index.vue'

@Component({
  components: {
    IndexContainer,
  },
})
export default class SamplePage extends Vue {}
</script>
