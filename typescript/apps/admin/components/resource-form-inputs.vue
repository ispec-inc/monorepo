<template>
  <div>
    <template v-for="input of form.inputs">
      <template v-if="input.type === 'list'">
        <v-expansion-panels
          :key="input.key"
          v-model="input.openPanelIds"
          flat
          multiple
        >
          <v-expansion-panel
            v-for="(group, i) of input.groups"
            :key="input.key + i"
          >
            <v-card elevation="0" outlined class="mb-2">
              <validation-observer v-slot="{ invalid }">
                <v-expansion-panel-header>
                  <v-row no-gutters align="center">
                    <v-col v-if="invalid" cols="auto" class="mr-2">
                      <v-icon color="error">mdi-alert-circle</v-icon>
                    </v-col>
                    <v-col>
                      {{ group.heading }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="pt-4" eager>
                  <template v-for="child of group.inputs">
                    <resource-form-partial
                      :key="input.key + i + child.key"
                      :input="child"
                      class="input-partial"
                    ></resource-form-partial>
                  </template>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error"
                      class="font-weight-bold pr-4"
                      @click="input.removeGroupByIndex(i)"
                    >
                      <v-icon left>mdi-delete</v-icon>
                      削除
                    </v-btn>
                  </v-card-actions>
                </v-expansion-panel-content>
              </validation-observer>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn
          :key="'append-' + input.key"
          width="100%"
          color="primary"
          outlined
          class="my-4"
          @click="input.appendNewGroup()"
        >
          {{ input.label }}を追加する
        </v-btn>
      </template>
      <template v-else-if="input.type === 'switch'">
        <resource-form-partial
          :key="input.key"
          :input="input"
          class="input-partial"
        ></resource-form-partial>
        <template v-if="input.shouldShowInputs">
          <template v-for="inputChild of input.inputs">
            <resource-form-partial
              :key="inputChild.key"
              :input="inputChild"
              class="input-partial"
            ></resource-form-partial>
          </template>
        </template>
      </template>
      <template v-else>
        <resource-form-partial
          :key="input.key"
          :input="input"
          class="input-partial"
        ></resource-form-partial>
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
import { FormModule, FormAbstructModule } from 'fast-form'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class ResourceFormInputs extends Vue {
  @Prop({ type: Object, default: null }) readonly form!: FormModule<
    FormAbstructModule<any>
  > | null
}
</script>
