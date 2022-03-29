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
    <v-card v-for="[id, c] of commentEntries" :key="id.value" class="mb-2">
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
import { SamplePostCommentEntry } from '~/core/models/domain/sample/comment'
import ErrorModel from '~/core/models/error'
import { SampleCommentFindAllRepositoryImpl } from '~/core/repositories/sample/comment/find-all'
import { SamplePostFindRepositoryImpl } from '~/core/repositories/sample/post/find'
import { SampleDetailPageService } from '~/core/services/sample/detail'
import { GlobalEventBus } from '~/surface/event-bus/global'
import { NaturalNumber } from '~/types/value-object/natural-number'

@Component({
  components: {},
})
export default class PostDetailPage extends mixins(UseSubscription) {
  readonly service = new SampleDetailPageService({
    find: new SamplePostFindRepositoryImpl(),
    comments: new SampleCommentFindAllRepositoryImpl(),
  })

  created(): void {
    this.fetchDetail(NaturalNumber.from(this.$route.params.id))
  }

  fetchDetail(id: NaturalNumber): void {
    this.service.fetch(id).catch((err) => {
      const { message } = new ErrorModel(err)
      GlobalEventBus.getInstance().dispatchSnackbarEvent({
        type: 'error',
        message,
      })
    })
  }

  get title(): string {
    return this.service.post?.title ?? ''
  }

  get body(): string {
    return this.service.post?.body ?? ''
  }

  get commentEntries(): SamplePostCommentEntry[] {
    return this.service.comments.map((c) => c.toEntry())
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
