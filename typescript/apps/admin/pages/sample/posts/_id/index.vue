<template>
  <div>
    <h2 class="mb-10">Post Detail</h2>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ body }}</v-card-text>
    </v-card>
    <h2 class="my-10">Comments</h2>
    <v-card v-for="[id, c] of commentEntries" :key="id" class="mb-2">
      <v-card-title>{{ c.name }}</v-card-title>
      <v-card-subtitle>{{ c.email }}</v-card-subtitle>
      <v-card-text>{{ c.body }}</v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
// .post-detail-page {}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { SamplePostCommentEntry } from '~/core/model/domain/sample/comment'
import { SampleDetailPageService } from '~/core/service/sample/detail/index'
import { SampleDetailPageUsecaseImpl } from '~/core/service/sample/detail/usecases'

const SERVICE = new SampleDetailPageService(new SampleDetailPageUsecaseImpl())

@Component({
  components: {},
})
export default class PostDetailPage extends Vue {
  readonly service = SERVICE

  created(): void {
    this.service.fetch(Number(this.$route.params.id))
  }

  get title(): string {
    return this.service.title
  }

  get body(): string {
    return this.service.body
  }

  get commentEntries(): SamplePostCommentEntry[] {
    return this.service.commentEntries
  }
}
</script>
