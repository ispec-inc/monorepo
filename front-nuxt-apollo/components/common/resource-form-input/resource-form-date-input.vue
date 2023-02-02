<template>
  <v-menu
    v-model="isOpenDatePicker"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <validation-provider v-slot="{ errors }" :name="label" :rules="rules">
        <v-text-field
          v-if="isVisible"
          v-model="valueForDisplay"
          :label="label"
          :error-messages="errors"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </validation-provider>
    </template>
    <v-date-picker
      v-model="value"
      @input="isOpenDatePicker = false"
    />
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { FormDateInputModule } from '@monorepo/fast-form'
import dayjs from 'dayjs'

@Component({
  components: {
    ValidationProvider
  }
})
export default class ResourceFormDateInput extends Vue {
  @Prop() readonly input!: FormDateInputModule

  isOpenDatePicker = false

  get label(): string {
    return this.input.label
  }

  get value(): string {
    return this.input.value ? dayjs(this.input.value).format('YYYY-MM-DD') : ''
  }

  set value(value: string) {
    this.input.value = value
  }

  get valueForDisplay(): string {
    return this.input.valueForDisplay
  }

  get rules(): string {
    return this.isVisible ? this.input.rules : ''
  }

  get isVisible(): boolean {
    return this.input.isVisible
  }
}
</script>
