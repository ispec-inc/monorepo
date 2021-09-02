<template>
  <div>
    <template v-for="(input, i) of inputs">
      <template v-if="input.type === 'text'">
        <resource-form-text-input :key="i" :input="input" />
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.resource-form {
  display: block;
  max-width: 600px;
  margin: auto;

  .input-partial:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { RFormInputModule } from '@monorepo/fast-form'
import ResourceFormTextInput from './resource-form-input/resource-form-text-input.vue'

@Component({
  components: {
    ValidationObserver,
    ResourceFormTextInput,
  },
})
export default class ResourceFormInputs extends Vue {
  @Prop() readonly inputs!: RFormInputModule<unknown>[]
}
</script>
