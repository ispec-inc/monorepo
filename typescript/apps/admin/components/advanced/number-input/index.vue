<template>
  <v-text-field
    v-model="number"
    :label="label"
    :rules="rules"
    type="number"
    outlined
    validate-on-blur
    hide-details="auto"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component({})
export default class NumberInput extends Vue {
  @Prop() value!: number | null
  @Prop() label!: string
  @Prop() rules?: ((value: number) => boolean | string)[]
  @Emit() input(value: number | null) {
    return value
  }

  get number(): number | null {
    return this.value
  }

  set number(value: number | null) {
    this.input(value ? Number(value) : null)
  }
}
</script>
