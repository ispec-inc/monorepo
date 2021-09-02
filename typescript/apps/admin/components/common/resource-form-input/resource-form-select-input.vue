<template>
  <validation-provider v-slot="{ errors }" :name="label" :rules="rules">
    <v-select
      v-model="value"
      :items="choices"
      :label="label"
      prepend-icon="mdi-form-select"
      :error-messages="errors"
    ></v-select>
  </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { RFormSelectInputModule } from '@monorepo/fast-form'

@Component({
  components: {
    ValidationProvider,
  },
})
export default class ResourceFormSelectInput extends Vue {
  @Prop() readonly input!: RFormSelectInputModule<unknown>

  get label(): string {
    return this.input.label
  }

  get value(): unknown {
    return this.input.value
  }

  set value(value: unknown) {
    this.input.value = value
  }

  get choices(): RFormSelectInputModule<unknown>['choices'] {
    return this.input.choices
  }

  get rules(): string {
    return this.input.rules
  }
}
</script>
