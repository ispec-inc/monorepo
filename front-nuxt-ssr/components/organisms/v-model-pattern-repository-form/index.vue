<template>
  <form>
    <h4>v-modelパターンのorganism</h4>
    <p>
      <label>name</label>
      <input v-model="name" />
    </p>
    <p>
      <label>lang</label>
      <input v-model="language" />
    </p>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Emit, Prop } from 'vue-property-decorator'

@Component({})
export default class VModelPatternRepositoryForm extends Vue {
  @Prop() value!: any
  @Emit() input(value: any) {
    return value
  }

  get formData(): any {
    return this.value
  }

  set formData(value: any) {
    this.input(value)
  }

  get name() {
    return this.formData.name
  }

  set name(name) {
    this.formData = {
      ...this.formData,
      name,
    }
  }

  get language() {
    return this.formData.language
  }

  set language(language) {
    this.formData = {
      ...this.formData,
      language,
    }
  }
}
</script>

<!--<style scoped>-->
<!--</style>-->
