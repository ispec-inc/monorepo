<template>
  <div>
    トップ
    <index-container></index-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import IndexContainer from '@/components/containers/index-container/index.vue'

@Component({
  components: {
    IndexContainer,
  },
})
export default class TopPage extends Vue {}
</script>
