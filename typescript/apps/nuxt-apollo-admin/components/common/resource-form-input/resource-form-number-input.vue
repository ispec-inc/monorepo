<template>
  <validation-provider v-slot="{ errors }" :name="label" :rules="rules">
    <v-text-field
      v-if="isVisible"
      v-model.number="value"
      prepend-icon="mdi-numeric"
      type="number"
      :error-messages="errors"
      :label="label"
    />
  </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { FormNumberInputModule } from '@monorepo/fast-form'

@Component({
  components: {
    ValidationProvider
  }
})
export default class ResourceFormNumberInput extends Vue {
  @Prop() readonly input!: FormNumberInputModule

  get label(): string {
    return this.input.label
  }

  get value(): number {
    return this.input.value
  }

  set value(value: number) {
    this.input.value = value
  }

  get rules(): string {
    return this.isVisible ? this.input.rules : ''
  }

  get isVisible(): boolean {
    return this.input.isVisible
  }
}
</script>
