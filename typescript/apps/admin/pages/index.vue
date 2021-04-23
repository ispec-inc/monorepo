<template>
  <div>
    <div>トップ</div>
    {{ placeList }}
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import placeModule from '../store/modules/place.ts'

@Component({})
export default class TopPage extends Vue {
  created() {
    placeModule.fetchPlaceList()
  }

  get placeList() {
    return placeModule.placeList
  }
}
</script>
