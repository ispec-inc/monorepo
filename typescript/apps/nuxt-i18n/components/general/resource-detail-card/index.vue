<template>
  <v-card class="pa-4 pt-8">
    <slot></slot>
    <v-card-actions class="mt-4">
      <v-spacer></v-spacer>
      <template v-if="resource">
        <v-btn
          color="success"
          link
          :to="$route.params.id + '/edit'"
          class="font-weight-bold mr-2 pr-4"
        >
          <v-icon left>mdi-pencil</v-icon>
          編集
        </v-btn>
        <v-btn
          color="error"
          class="font-weight-bold pr-4"
          @click="dialog = true"
        >
          <v-icon left>mdi-delete</v-icon>
          削除
        </v-btn>
      </template>
      <dialog-delete
        :dialog="dialog"
        :target="resource"
        @cancel="dialog = false"
        @delete="deleteItem"
      ></dialog-delete>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Resource } from '@monorepo/fast-form'

@Component({})
export default class ResourceDetailCard extends Vue {
  @Prop({ type: Object, default: null }) readonly resource!: Resource | null

  @Emit('delete')
  deleteItem(): void {
    this.dialog = false
  }

  dialog = false
}
</script>
