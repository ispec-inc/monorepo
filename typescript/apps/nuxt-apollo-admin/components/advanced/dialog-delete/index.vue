<template>
  <v-dialog v-if="target" :value="dialog" max-width="500" @input="cancel">
    <v-card>
      <v-card-title>{{ target.itemName }} を本当に削除しますか？</v-card-title>
      <v-card-text> この操作は取り消せません </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="cancel">
          キャンセル
        </v-btn>
        <v-btn color="primary" text @click="deleteItem">
          削除する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Resource } from '@monorepo/fast-form'

@Component({})
export default class DialogDelete extends Vue {
  @Prop({ required: true }) readonly dialog!: boolean
  @Prop({ required: true }) readonly target!: Resource | null

  @Emit()
  cancel(): void {}

  @Emit('delete')
  deleteItem(): void {}
}
</script>
