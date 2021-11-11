<template>
  <validation-observer v-if="form" ref="observer">
    <form>
      <div class="resource-form pt-4 pb-10">
        <template v-if="isSeparated">
          <resource-separated-form :form="form" />
        </template>
        <template v-else>
          <resource-form-inputs :inputs="inputs" />
        </template>
      </div>
      <v-card-actions class="mt-4">
        <v-spacer></v-spacer>
        <v-btn
          class="mr-4 primary font-weight-bold pr-3 mr-2"
          @click="validateForm"
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
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import {
  FormInputModule,
  FormModule,
  SeparatedFormModule,
} from '@monorepo/fast-form'
import ResourceFormInputs from './resource-form-inputs.vue'
import ResourceSeparatedForm from './resource-separated-form.vue'

@Component({
  components: {
    ValidationObserver,
    ResourceFormInputs,
    ResourceSeparatedForm,
  },
})
export default class ResourceForm extends Vue {
  @Ref('observer') observerRef!: InstanceType<typeof ValidationObserver>
  @Prop({ default: null }) readonly form!:
    | FormModule<{}>
    | SeparatedFormModule<{}>
    | null

  @Prop({ default: false }) readonly isPost!: boolean

  @Emit()
  submit(): unknown {
    if (this.form === null) {
      return null
    }

    return this.form.getFormValue()
  }

  get inputs(): Array<FormInputModule<unknown>> {
    if (!this.form) {
      return []
    }

    return this.form.isSeparated ? [] : this.form.inputs
  }

  get isSeparated(): boolean {
    return this.form?.isSeparated || false
  }

  async validateForm(): Promise<void> {
    const result = await this.observerRef.validate()

    if (result === true) {
      this.submit()
    }
  }

  clear(): void {
    if (this.form) {
      this.form.clear()
    }
  }
}
</script>
