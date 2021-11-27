<template>
  <div>
    <v-card>
      <v-card-title>サンプルフォーム</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <resource-form
          :form="form"
          :is-post="true"
          @submit="submit"
        ></resource-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SampleSeparatedForm } from '~/form-providers/sample-separated-form'
import ResourceForm from '~/components/common/resource-form.vue'

@Component({
  components: {
    ResourceForm,
  },
})
export default class SampleSeparatedFormPage extends Vue {
  form = SampleSeparatedForm.provideModule()

  submit(value: SampleSeparatedForm.AsObject): void {
    console.log(value)
  }
}
</script>
