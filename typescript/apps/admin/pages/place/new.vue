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

@Component({})
export default class AnimeNewPage extends Vue {
  isFetching = false
  form = PlaceForm()

  submit(_: any | null) {
    console.log('submit')
  }
}
</script>
