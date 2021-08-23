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
    <!-- Recommend writing v-model-pattern-repository-form -->
    <!-- v-model-pattern-repository-formの書き方を推奨 -->
    <v-model-pattern-repository-form v-model="firstResponse" />
    <key-value-pattern-repository-form v-model="firstResponse" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import sampleModule from '~/store/sample'
import VModelPatternRepositoryForm from '~/components/organisms/v-model-pattern-repository-form/index.vue'
import KeyValuePatternRepositoryForm from '~/components/organisms/key-value-pattern-repository-form/index.vue'

Component.registerHooks(['fetch'])

@Component({
  components: {
    VModelPatternRepositoryForm,
    KeyValuePatternRepositoryForm,
  },
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

  get firstResponse() {
    return sampleModule.firstResponse
  }

  set firstResponse(value: any) {
    sampleModule.setFirstResponse(value)
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
