<template>
  <div>
    <v-card>
      <v-card-title>場所登録</v-card-title>
      <v-divider />
      <v-card-text>
        <resource-form
          :form="form"
          :is-post="true"
          @submit="submit"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { SampleForm } from '~/form-providers/sample-form'
import ResourceForm from '~/components/common/resource-form.vue'
import BeforeUnloadGuardMixin from '~/components/mixins/beforeunload-guard'

@Component({
  components: {
    ResourceForm
  }
})
export default class SampleFormPage extends mixins(BeforeUnloadGuardMixin) {
  form = SampleForm.provideModule()

  submit(value: SampleForm.AsObject): void {
    console.log(value)
  }
}
</script>
