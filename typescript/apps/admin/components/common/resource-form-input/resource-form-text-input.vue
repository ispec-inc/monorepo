<template>
  <validation-provider v-slot="{ errors }" :name="label" :rules="rules">
    <v-text-field
      v-model="value"
      prepend-icon="mdi-format-text"
      :error-messages="errors"
      :label="label"
    ></v-text-field>
  </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { RFormTextInput } from '@monorepo/fast-form'

@Component({
  components: {
    ValidationProvider,
  },
})
export default class ResourceFormTextInput extends Vue {
  @Prop() readonly input!: RFormTextInput

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
    return this.input.rules
  }
}
</script>
