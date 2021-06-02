<template>
  <div>トップ</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import articleModule from '@/store/article'

@Component({})
export default class TopPage extends Vue {
  created() {
    articleModule.fetch()
  }
}
</script>
