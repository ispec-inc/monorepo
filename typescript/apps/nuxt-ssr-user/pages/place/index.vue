<template>
  <div>
    <div>プレイス一覧</div>
    <button @click="pushToIndex">transition</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class PlacePage extends Vue {
  pushToIndex() {
    this.$router.push('/')
  }
}
</script>
