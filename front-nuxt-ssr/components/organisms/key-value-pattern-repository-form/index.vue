<template>
  <form>
    <h4>key valueでemitするパターンのorganism</h4>
    <p>
      <label>name</label>
      <input
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
      <label>lang</label>
      <input
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
