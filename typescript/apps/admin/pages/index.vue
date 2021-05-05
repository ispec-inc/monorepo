<template>
  <div>
    <div>トップ</div>
    {{ placeList }}
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import articleModule from '@/store/modules/article.ts'
import placeModule from '../store/modules/place.ts'

@Component({})
export default class TopPage extends Vue {
  created() {
    articleModule.fetchPlaceList()
  }

  get placeList() {
    return placeModule.placeList
  }
}
</script>
