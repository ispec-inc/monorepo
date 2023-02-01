<template>
  <div>
    <v-card>
      <a-data-table
        :title="'プレイス一覧'"
        :headers="headers"
        :items="places"
        :loading="isFetching"
        @detail="goDetailPage"
        @edit="goEditPage"
        @delete="openDialogDelete"
      />
    </v-card>
    <dialog-delete
      :dialog="dialog"
      :target="target"
      @cancel="dialog = false"
      @delete="deleteItem"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import PlaceResource from '~/resources/place'
import Resource from '~/resources/resource'

@Component({})
export default class PlacePage extends Vue {
  isFetching = false
  dialog = false
  target: Resource | null = null
  headers = [
    {
      text: 'ID',
      value: 'id'
    },
    {
      text: '名前(日本語)',
      value: 'nameJa'
    },
    {
      text: 'タイトル(英語)',
      value: 'nameEn'
    },
    {
      text: '編集/削除',
      value: 'actions',
      align: 'center',
      sortable: false
    }
  ]

  places: PlaceResource[] = []

  deleteItem(): void {
    if (this.target) {
      this.dialog = false
    }
  }

  goDetailPage(place: PlaceResource): void {
    this.$router.push(this.$pagesPath.place._id(place.id).$url())
  }

  goEditPage(place: PlaceResource): void {
    this.$router.push(this.$pagesPath.place._id(place.id).edit.$url()) // `/place/${place.id}/edit`
  }

  openDialogDelete(place: PlaceResource): void {
    this.target = place
    this.dialog = true
  }
}
</script>
