<template>
  <div>
    <template v-if="['text', 'number'].includes(input.type)">
      <validation-provider
        v-slot="{ errors }"
        :name="input.label"
        :rules="input.rules"
      >
        <v-text-field
          v-model="input.value"
          :prepend-icon="
            input.type === 'text' ? 'mdi-format-text' : 'mdi-numeric'
          "
          :error-messages="errors"
          :label="input.label"
        ></v-text-field>
      </validation-provider>
    </template>
    <template v-else-if="input.type === 'image'">
      <validation-provider
        v-slot="{ errors }"
        :name="input.label"
        rules="required"
      >
        <v-file-input
          v-model="input.file"
          :error-messages="errors"
          :label="input.label"
          :loading="input.isFetching"
          :disabled="input.isFetching"
          :error="input.isFetching"
          prepend-icon="mdi-file-image"
          accept="image/png, image/jpeg, image/bmp"
        >
        </v-file-input>
      </validation-provider>
      <template v-if="input.value !== ''">
        <v-subheader class="pa-0">画像のプレビュー</v-subheader>
        <v-img width="100%" max-height="400px" contain :src="input.value" />
      </template>
    </template>
    <template v-else-if="input.type === 'select'">
      <validation-provider
        v-slot="{ errors }"
        :name="input.label"
        :rules="input.rules"
      >
        <v-select
          v-model="input.value"
          :items="input.choices"
          :label="input.label"
          prepend-icon="mdi-form-select"
          :error-messages="errors"
        ></v-select>
      </validation-provider>
    </template>
    <template v-else-if="input.type === 'date'">
      <v-menu
        v-model="input.isOpenDatePciker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <validation-provider
            v-slot="{ errors }"
            :name="input.label"
            :rules="input.rules"
          >
            <v-text-field
              v-model="input.date"
              :label="input.label"
              :error-messages="errors"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </validation-provider>
        </template>
        <v-date-picker
          v-model="input.date"
          @input="input.isOpenDatePciker = false"
        ></v-date-picker>
      </v-menu>
    </template>
    <template v-else-if="input.type === 'switch'">
      <v-switch v-model="input.value" :label="input.label"></v-switch>
    </template>
  </div>
</template>

<script lang="ts">
import { required, numeric, excluded, integer } from 'vee-validate/dist/rules'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import { FormInputModule } from '@monorepo/fast-form'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_}を入力してください',
})

extend('numeric', {
  ...numeric,
  message: '{_field_}は正の整数で入力してください',
})

extend('excluded', {
  ...excluded,
  message: '無効な値です',
})

extend('integer', {
  ...integer,
  message: '{_field_}は正の整数で入力してください',
})

@Component({
  components: {
    ValidationProvider,
  },
})
export default class ResourceFormPartial extends Vue {
  @Prop({ type: Object, default: null })
  readonly input!: FormInputModule<any> | null
}
</script>
