<template>
  <form>
    <h2>key valueでemitするパターンのorganism</h2>
    <p>
      <label for="key-value-pattern-repository-form-name">name</label>
      <input
        id="key-value-pattern-repository-form-name"
        :value="formData.name"
        @input="
          updateValue({
            keyName: 'name',
            value: $event.target.value,
          })
        "
      />
    </p>
    <p>
      <label for="key-value-pattern-repository-form-lang">lang</label>
      <input
        id="key-value-pattern-repository-form-lang"
        :value="formData.language"
        @input="
          updateValue({
            keyName: 'language',
            value: $event.target.value,
          })
        "
      />
    </p>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Emit, Prop } from 'vue-property-decorator'

@Component({})
export default class KeyValuePatternRepositoryForm extends Vue {
  @Prop() value!: any
  @Emit() input(valueInfo: { keyName: string; value: string }) {
    return valueInfo
  }

  get formData(): any {
    return this.value
  }

  updateValue(valueInfo: {
    keyName: string
    value: string | number | boolean
  }) {
    const newValue = JSON.parse(JSON.stringify(this.formData))
    newValue[valueInfo.keyName] = valueInfo.value
    this.input(newValue)
  }
}
</script>

<!--<style scoped>-->
<!--</style>-->
