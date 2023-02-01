<template>
  <validation-provider v-slot="{ errors }" :name="label" :rules="rules">
    <v-text-field
      v-if="isVisible"
      v-model="value"
      prepend-icon="mdi-format-text"
      :error-messages="errors"
      :label="label"
      type="password"
    ></v-text-field>
  </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { FormTextInputModule } from '@monorepo/fast-form'

@Component({
  components: {
    ValidationProvider,
  },
})
export default class ResourceFormPasswordInput extends Vue {
  @Prop() readonly input!: FormTextInputModule

  get label(): string {
    return this.input.label
  }

  get value(): string {
    return this.input.value
  }

  set value(value: string) {
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
