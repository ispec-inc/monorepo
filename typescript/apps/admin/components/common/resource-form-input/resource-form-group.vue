<template>
  <v-card elevation="0" outlined class="mb-2">
    <validation-observer v-slot="{ invalid }">
      <v-expansion-panel-header>
        <v-row no-gutters align="center">
          <v-col v-if="invalid" cols="auto" class="mr-2">
            <v-icon color="error">mdi-alert-circle</v-icon>
          </v-col>
          <v-col>
            {{ heading }}
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="pt-4" eager>
        <resource-form-inputs :inputs="inputs" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" class="font-weight-bold pr-4" @click="remove">
            <v-icon left>mdi-delete</v-icon>
            削除
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
    </validation-observer>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { ValidationObserver } from 'vee-validate'
// eslint-disable-next-line import/named
import { FormGroupModule, IFormModuleItem } from '@monorepo/fast-form'

@Component({
  components: {
    ValidationObserver,
    ResourceFormInputs: () =>
      import('~/components/common/resource-form-inputs.vue'),
  },
})
export default class ResourceFormGroup extends Vue {
  @Prop() readonly group!: FormGroupModule<{}>
  @Prop() readonly index!: number

  @Emit() remove(): number {
    return this.index
  }

  get heading(): string {
    return this.group.heading
  }

  get inputs(): Array<IFormModuleItem<unknown>> {
    return this.group.inputs
  }
}
</script>
