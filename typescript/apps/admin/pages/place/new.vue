<template>
  <div>
    <v-card>
      <v-card-title>場所登録</v-card-title>
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
import { PlaceForm } from '~/form-providers/place'
import ResourceForm from '~/components/common/resource-form.vue'

@Component({
  components: {
    ResourceForm,
  },
})
export default class AnimeNewPage extends Vue {
  isFetching = false
  form = PlaceForm.provideModule()

  submit(value: PlaceForm.AsObject) {
    console.log(value)
  }
}
</script>
