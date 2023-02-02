<template>
  <div>
    <span>{{ userId }}</span>
    <v-btn @click="pushToSamplePage(1)">
      userId 1
    </v-btn>
    <v-btn @click="pushToSamplePage(2)">
      userId 2
    </v-btn>
    <v-btn @click="pushToSamplePage(3)">
      userId 3
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

export type Query = {
  userId: number
}

@Component({
  components: {}
})
export default class SamplePage extends Vue {
  get userId(): number {
    const num = Number(this.$route.query.userId)
    return isNaN(num) ? 0 : num
  }

  pushToSamplePage(userId: number): void {
    this.$router.push(this.$pagesPath.sample.$url({ query: { userId } }))
  }
}
</script>
