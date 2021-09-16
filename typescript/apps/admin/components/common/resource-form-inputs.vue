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
const ResourceFormTextInput = () =>
  import('./resource-form-input/resource-form-text-input.vue')
const ResourceFormNumberInput = () =>
  import('./resource-form-input/resource-form-number-input.vue')
const ResourceFormSwitchInput = () =>
  import('./resource-form-input/resource-form-switch-input.vue')
const ResourceFormDateInput = () =>
  import('./resource-form-input/resource-form-date-input.vue')
const ResourceFormSelectInput = () =>
  import('./resource-form-input/resource-form-select-input.vue')
const ResourceFormImageInput = () =>
  import('./resource-form-input/resource-form-image-input.vue')
const ResourceFormGroupList = () =>
  import('./resource-form-input/resource-form-group-list.vue')

@Component({
  components: {
    ValidationObserver,
    ResourceFormTextInput,
    ResourceFormNumberInput,
    ResourceFormSwitchInput,
    ResourceFormDateInput,
    ResourceFormSelectInput,
    ResourceFormImageInput,
    ResourceFormGroupList,
  },
})
export default class ResourceFormInputs extends Vue {
  @Prop() readonly inputs!: FormInputModule<unknown>[]
}
</script>
