<template>
  <div v-if="isVisible">
    <validation-provider v-slot="{ errors }" :name="label" :rules="rules">
      <v-file-input
        :value="input.file"
        :error-messages="errors"
        :label="label"
        :loading="isFetching"
        :disabled="isFetching"
        :error="isFetching"
        prepend-icon="mdi-file-image"
        accept="image/png, image/jpeg, image/bmp"
        @change="inputFile"
      >
      </v-file-input>
    </validation-provider>
    <template v-if="value !== ''">
      <v-subheader class="pa-0">画像のプレビュー</v-subheader>
      <v-img width="100%" max-height="400px" contain :src="value" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { FormImageInputModule } from '@monorepo/fast-form'

@Component({
  components: {
    ValidationProvider,
  },
})
export default class ResourceFormImageInput extends Vue {
  @Prop() readonly input!: FormImageInputModule

  get label(): string {
    return this.input.label
  }

  get value(): string {
    return this.input.value
  }

  get isFetching(): boolean {
    return this.input.isFetching
  }

  get rules(): string {
    return this.isVisible ? this.input.rules : ''
  }

  inputFile(value: File | undefined | null): void {
    this.input.file = value || undefined
  }

  get isVisible(): boolean {
    return this.input.isVisible
  }
}
</script>
