<template>
  <div>
    <button @click="pushToPlace">transition</button>
    <button @click="$fetch">refetch</button>
    <button @click="showStore">show store</button>
    <ul>
      <li v-for="repo in response" :key="repo.id">
        {{ repo.name }}
      </li>
    </ul>
    <form>
      <input v-model="firstResponseName" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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

  set response(value: Array<any>) {
    sampleModule.setResponse(value)
  }

  get firstResponseName() {
    return this.response[0].name
  }

  set firstResponseName(name) {
    this.response = [
      {
        ...this.response[0],
        name,
      },
      ...this.response.slice(1),
    ]
  }

  pushToPlace() {
    this.$router.push({ path: '/place' })
  }

  showStore() {
    console.log(sampleModule.response)
  }
}
</script>

<!--<style scoped>-->
<!--</style>-->
