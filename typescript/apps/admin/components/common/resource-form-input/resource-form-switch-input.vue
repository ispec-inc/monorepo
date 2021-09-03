<template>
  <validation-provider v-slot="{ errors }" :name="label" :rules="rules">
    <v-switch
      v-if="isVisible"
      v-model="value"
      :label="label"
      :error-messages="errors"
      class="pl-3"
    />
  </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { FormSwitchInputModule } from '@monorepo/fast-form'

@Component({
  components: {
    ValidationProvider,
  },
})
export default class ResourceFormSwitchInput extends Vue {
  @Prop() readonly input!: FormSwitchInputModule

  get label(): string {
    return this.input.label
  }

  get value(): boolean {
    return this.input.value
  }

  set value(value: boolean) {
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
