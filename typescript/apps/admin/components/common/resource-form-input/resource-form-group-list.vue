<template>
  <div>
    <v-expansion-panels v-model="openPanelIds" flat multiple>
      <v-expansion-panel v-for="(group, i) of input.groups" :key="i">
        <resource-form-group
          :index="i"
          :group="group"
          @remove="removeGroupByIndex"
        />
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn
      width="100%"
      color="primary"
      outlined
      class="my-4"
      @click="appendNewGroup"
    >
      {{ label }}を追加する
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FormGroupListModule, FormGroupModule } from '@monorepo/fast-form'
import ResourceFormGroup from './resource-form-group.vue'

@Component({
  components: {
    ResourceFormGroup,
  },
})
export default class ResourceFormGroupList extends Vue {
  @Prop() readonly input!: FormGroupListModule<{}>

  get label(): string {
    return this.input.label
  }

  get openPanelIds(): number[] {
    return this.input.openPanelIds
  }

  set openPanelIds(value: number[]) {
    this.input.openPanelIds = value
  }

  get groups(): Array<FormGroupModule<{}>> {
    return this.input.groups
  }

  appendNewGroup(): void {
    this.input.appendNewGroup()
  }

  removeGroupByIndex(index: number): void {
    this.input.removeGroupByIndex(index)
  }
}
</script>
