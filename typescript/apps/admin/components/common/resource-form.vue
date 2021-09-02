<template>
  <validation-observer v-if="form" ref="observer">
    <form>
      <div class="resource-form pt-4 pb-10">
        <resource-form-inputs :inputs="inputs" />
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

  .input-partial:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { RFormInputModule, RFormModule } from '@monorepo/fast-form'
import ResourceFormInputs from './resource-form-inputs.vue'

@Component({
  components: {
    ValidationObserver,
    ResourceFormInputs,
  },
})
export default class ResourceForm extends Vue {
  @Ref('observer') observerRef!: InstanceType<typeof ValidationObserver>
  @Prop({ default: null }) readonly form!: RFormModule<{}> | null
  @Prop({ default: false }) readonly isPost!: boolean

  @Emit()
  submit(): unknown {
    if (this.form === null) {
      return null
    }

    return this.form.getFormValue()
  }

  get inputs(): RFormInputModule<unknown>[] {
    return this.form?.inputs || []
  }

  async validateForm() {
    const result = await this.observerRef.validate()

    if (result === true) {
      this.submit()
    }
  }

  clear() {
    if (this.form) {
      this.form.clear()
    }
  }
}
</script>
