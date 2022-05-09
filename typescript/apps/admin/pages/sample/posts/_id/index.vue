<template>
  <div>
    <h2 class="mb-10">Post Detail</h2>
    <v-skeleton-loader v-if="service.isAwaitingPost" type="article, actions" />
    <v-card v-else>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ body }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="primary" @click="pushToEditPage">edit</v-btn>
      </v-card-actions>
    </v-card>
    <h2 class="my-10">Comments</h2>
    <v-skeleton-loader v-if="service.isAwaitingComments" type="article" />
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
import { Component, mixins } from 'nuxt-property-decorator'
import UseSubscription from '~/components/mixins/use-subscription'
import ErrorModel from '~/core/models/error'
import { SampleCommentFindAllRepositoryImpl } from '~/core/repositories/sample/comment/find-all'
import { SamplePostFindRepositoryImpl } from '~/core/repositories/sample/post/find'
import { SampleDetailPageService } from '~/core/services/sample/detail'
import { SamplePostId } from '~/core/values/sample/post/id'
import { GlobalEventBus } from '~/surface/event-bus/global'

type SamplePostCommentEntry = [
  id: number,
  data: { name: string; email: string; body: string }
]

@Component({
  components: {},
})
export default class PostDetailPage extends mixins(UseSubscription) {
  readonly service = new SampleDetailPageService({
    find: new SamplePostFindRepositoryImpl(),
    comments: new SampleCommentFindAllRepositoryImpl(),
  })

  created(): void {
    this.fetchDetail(SamplePostId.from(this.$route.params.id))
  }

  fetchDetail(id: SamplePostId): void {
    this.service.fetch(id).catch((err) => {
      const { message } = new ErrorModel(err)
      GlobalEventBus.getInstance().dispatchSnackbarEvent({
        type: 'error',
        message,
      })
    })
  }

  get title(): string {
    return this.service.post?.rawValue.title ?? ''
  }

  get body(): string {
    return this.service.post?.rawValue.body ?? ''
  }

  get commentEntries(): SamplePostCommentEntry[] {
    return this.service.comments.map((c) => {
      const { id, body, email, name } = c.rawValue

      return [id.value, { name, body, email }]
    })
  }

  pushToEditPage(): void {
    this.$router.push(
      this.$pagesPath.sample.posts
        ._id(Number(this.$route.params.id))
        .edit.$url()
    )
  }
}
</script>
