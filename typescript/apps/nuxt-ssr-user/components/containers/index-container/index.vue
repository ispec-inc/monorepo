<template>
  <div>
    <button @click="pushToPlace">transition</button>
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

  pushToPlace() {
    this.$router.push({ path: '/place' })
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
