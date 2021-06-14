<template>
  <div>
    <button @click="$router.push({ query: { q: 'text' } })">transition</button>
    <p>{{ response }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import sampleModule from '~/store/sample'

Component.registerHooks(['fetch'])

@Component({
  async fetch() {
    console.debug('fetchinggggg')
    await sampleModule.fetch()
  },
})
export default class IndexContainer extends Vue {
  // async created() {
  //   console.debug(sampleModule)
  //   console.debug('fetchinggggg')
  //   await sampleModule.fetch()
  // }

  get response() {
    return sampleModule.response
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
