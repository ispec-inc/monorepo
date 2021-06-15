<template>
  <div>
    <button @click="$router.push({ query: { q: 'text' } })">transition</button>
    <ul>
      <li v-for="repo in response" :key="repo.id">
        {{ repo.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import sampleModule from '~/store/sample'

Component.registerHooks(['fetch'])

@Component({
  async fetch() {
    await sampleModule.fetch()
  },
})
export default class IndexContainer extends Vue {
  get response() {
    return sampleModule.response
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
