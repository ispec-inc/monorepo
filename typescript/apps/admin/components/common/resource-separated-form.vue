<template>
  <div>
    <v-tabs v-model="tab" center-active show-arrows>
      <v-tab v-for="tn of tabNames" :key="tn">
        {{ tn }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="py-10">
      <v-tab-item v-for="(inputs, i) of inputGroups" :key="i">
        <resource-form-inputs :inputs="inputs" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
// eslint-disable-next-line import/named
import { IFormModuleItem, SeparatedFormModule } from '@monorepo/fast-form'
import ResourceFormInputs from './resource-form-inputs.vue'

@Component({
  components: {
    ValidationObserver,
    ResourceFormInputs,
  },
})
export default class ResourceSeparatedForm extends Vue {
  @Prop({ default: null }) readonly form!: SeparatedFormModule<{}> | null

  tab = 0

  get tabNames(): string[] {
    return this.form?.separatedInputs.map(([name, _]) => name) || []
  }

  get inputGroups(): Array<Array<IFormModuleItem<unknown>>> {
    return this.form?.separatedInputs.map(([_, inputs]) => inputs) || []
  }
}
</script>
