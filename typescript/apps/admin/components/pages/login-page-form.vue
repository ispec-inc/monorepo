<template>
  <validation-observer v-if="form" ref="observer">
    <form>
      <div class="resource-form pt-4 pb-10">
        <resource-form-inputs :inputs="inputs" />
      </div>
      <v-card-actions class="mt-4">
        <v-spacer></v-spacer>
        <v-btn
          class="primary font-weight-bold pr-2"
          width="200px"
          :loading="loading"
          @click="validateForm"
        >
          ログイン
        </v-btn>
        <v-spacer></v-spacer>
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
import { FormInputModule, FormModule } from '@monorepo/fast-form'
import ResourceFormInputs from '~/components/common/resource-form-inputs.vue'

@Component({
  components: {
    ValidationObserver,
    ResourceFormInputs,
  },
})
export default class LoginPageForm extends Vue {
  @Ref('observer') observerRef!: InstanceType<typeof ValidationObserver>

  @Prop() loading?: boolean

  @Prop({ default: null }) readonly form!: FormModule<{}> | null

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

    return this.form.inputs
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
