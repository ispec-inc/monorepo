<template>
  <validation-observer v-if="form" ref="observer">
    <form>
      <div class="resource-form pt-4 pb-10">
        <template v-if="!form.isConstructedFormGroups">
          <resource-form-inputs :form="form"></resource-form-inputs>
        </template>
        <template v-else>
          <v-tabs v-model="tab" center-active show-arrows>
            <v-tab v-for="tab of form.tabs" :key="tab">
              {{ tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="py-10">
            <v-tab-item
              v-for="inputGroup of form.inputs"
              :key="inputGroup.label"
            >
              <resource-form-inputs :form="inputGroup"></resource-form-inputs>
            </v-tab-item>
          </v-tabs-items>
        </template>
      </div>
      <v-card-actions class="mt-4">
        <v-spacer></v-spacer>
        <v-btn
          class="mr-4 primary font-weight-bold pr-3 mr-2"
          @click="validate"
        >
          <v-icon left>
            {{
              isPost
                ? 'mdi-shape-square-rounded-plus'
                : 'mdi-circle-edit-outline'
            }}
          </v-icon>
          {{ isPost ? '登録する' : '更新する' }}
        </v-btn>
        <v-btn class="font-weight-bold px-3" @click="clear">クリア</v-btn>
      </v-card-actions>
    </form>
  </validation-observer>
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
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { FormModule } from 'fast-form'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class ResourceForm extends Vue {
  @Prop({ type: Object, default: null }) readonly form!: FormModule<any> | null
  @Prop({ type: Boolean, default: false }) readonly isPost!: boolean

  tab = null

  async validate() {
    const result = await (this.$refs.observer as Vue & {
      validate: () => boolean
    }).validate()

    if (result === true) {
      this.submit()
    }
  }

  clear() {
    if (this.form) {
      this.form.clear()
    }
  }

  @Emit()
  submit() {
    if (this.form === null) {
      return null
    }

    return this.form.formValue()
  }
}
</script>
