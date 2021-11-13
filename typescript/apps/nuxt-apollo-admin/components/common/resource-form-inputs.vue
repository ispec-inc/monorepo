<template>
  <div>
    <template v-for="(input, i) of inputs">
      <template v-if="input.type === 'text'">
        <resource-form-text-input
          :key="i"
          :input="input"
          class="input-partial"
        />
      </template>
      <template v-if="input.type === 'password'">
        <resource-form-password-input
          :key="i"
          :input="input"
          class="input-partial"
        />
      </template>
      <template v-else-if="input.type === 'number'">
        <resource-form-number-input
          :key="i"
          :input="input"
          class="input-partial"
        />
      </template>
      <template v-else-if="input.type === 'switch'">
        <resource-form-switch-input
          :key="i"
          :input="input"
          class="input-partial"
        />
      </template>
      <template v-else-if="input.type === 'date'">
        <resource-form-date-input
          :key="i"
          :input="input"
          class="input-partial"
        />
      </template>
      <template v-else-if="input.type === 'select'">
        <resource-form-select-input
          :key="i"
          :input="input"
          class="input-partial"
        />
      </template>
      <template v-else-if="input.type === 'image'">
        <resource-form-image-input
          :key="i"
          :input="input"
          class="input-partial"
        />
      </template>
      <template v-else-if="input.type === 'list'">
        <resource-form-group-list
          :key="i"
          :input="input"
          class="input-partial"
        />
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.input-partial:not(:last-child) {
  margin-bottom: 20px;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { FormInputModule } from '@monorepo/fast-form'
import ResourceFormTextInput from './resource-form-input/resource-form-text-input.vue'
import ResourceFormPasswordInput from './resource-form-input/resource-form-password-input.vue'
import ResourceFormNumberInput from './resource-form-input/resource-form-number-input.vue'
import ResourceFormSwitchInput from './resource-form-input/resource-form-switch-input.vue'
import ResourceFormDateInput from './resource-form-input/resource-form-date-input.vue'
import ResourceFormSelectInput from './resource-form-input/resource-form-select-input.vue'
import ResourceFormImageInput from './resource-form-input/resource-form-image-input.vue'
import ResourceFormGroupList from './resource-form-input/resource-form-group-list.vue'

@Component({
  components: {
    ValidationObserver,
    ResourceFormTextInput,
    ResourceFormPasswordInput,
    ResourceFormNumberInput,
    ResourceFormSwitchInput,
    ResourceFormDateInput,
    ResourceFormSelectInput,
    ResourceFormImageInput,
    ResourceFormGroupList
  }
})
export default class ResourceFormInputs extends Vue {
  @Prop() readonly inputs!: Array<FormInputModule<unknown>>
}
</script>
