<template>
  <div>
    <v-card-title>{{ title }}</v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="id"
      :loading="loading"
      loading-text="データ取得中"
      @click:row="(item) => detail(item)"
    >
      <template v-slot:top></template>
      <template v-slot:[`item.actions`]="{ item }">
        <button class="action-button" @click.stop="edit(item)">
          <v-icon small color="primary">{{ icons.mdiPencil }}</v-icon>
        </button>
        <button class="action-button" @click.stop="deleteItem(item)">
          <v-icon small color="primary">{{ icons.mdiDelete }}</v-icon>
        </button>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
.action-button {
  width: 30px;
  height: 30px;
  outline: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { mdiPencil, mdiDelete } from '@mdi/js'

@Component({})
export default class AnipicDataTable extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: Array, required: true }) readonly headers!: string[]
  @Prop({ type: Array, default: [] }) readonly items!: string[]
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean

  icons = { mdiPencil, mdiDelete }

  @Emit()
  detail(item: any) {
    return item
  }

  @Emit()
  edit(item: any) {
    return item
  }

  @Emit('delete')
  deleteItem(item: any) {
    return item
  }
}
</script>
