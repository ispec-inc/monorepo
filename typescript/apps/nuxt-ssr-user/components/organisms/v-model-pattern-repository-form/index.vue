<template>
  <form>
    <h2>v-modelパターンのorganism</h2>
    <p>
      <label for="v-model-pattern-repository-form-name">name</label>
      <input id="v-model-pattern-repository-form-name" v-model="name" />
    </p>
    <p>
      <label for="v-model-pattern-repository-form-lang">lang</label>
      <input id="v-model-pattern-repository-form-lang" v-model="language" />
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
