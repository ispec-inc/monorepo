<template>
  <validation-provider v-slot="{ errors }" :name="label" :rules="rules">
    <v-select
      v-if="isVisible"
      v-model="value"
      :items="choices"
      :label="label"
      prepend-icon="mdi-form-select"
      :error-messages="errors"
    />
  </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { FormSelectInputModule } from '@monorepo/fast-form'

@Component({
  components: {
    ValidationProvider
  }
})
export default class ResourceFormSelectInput extends Vue {
  @Prop() readonly input!: FormSelectInputModule<unknown>

  get label(): string {
    return this.input.label
  }

  get value(): unknown {
    return this.input.value
  }

  set value(value: unknown) {
    this.input.value = value
  }

  get choices(): FormSelectInputModule<unknown>['choices'] {
    return this.input.choices
  }

  get rules(): string {
    return this.isVisible ? this.input.rules : ''
  }

  get isVisible(): boolean {
    return this.input.isVisible
  }
}
</script>
