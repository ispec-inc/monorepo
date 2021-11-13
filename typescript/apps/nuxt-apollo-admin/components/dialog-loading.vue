<template>
  <v-dialog v-model="loading" persistent width="300">
    <v-card color="primary">
      <v-card-text class="white--text font-weight-bold pa-6">
        通信中
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0 mt-2"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class DialogDelete extends Vue {
  @Prop({ required: true }) readonly loading!: boolean
}
</script>
