<template>
  <div>
    <h2 class="mb-10">Post Detail</h2>
    <v-skeleton-loader v-if="isAwaitingPost" type="article, actions" />
    <v-card v-else>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ body }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="primary" @click="pushToEditPage">edit</v-btn>
      </v-card-actions>
    </v-card>
    <h2 class="my-10">Comments</h2>
    <v-skeleton-loader v-if="isAwaitingComments" type="article" />
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
import { SamplePostCommentEntry } from '~/core/model/domain/sample/comment'
import { SampleDetailPageService } from '~/core/service/sample/detail/index'
import { SampleDetailPageUsecaseImpl } from '~/core/service/sample/detail/usecases'
import { GlobalEventBus } from '~/surface/event-bus/global'

const SERVICE = new SampleDetailPageService(new SampleDetailPageUsecaseImpl())

@Component({
  components: {},
})
export default class PostDetailPage extends mixins(UseSubscription) {
  readonly service = SERVICE

  created(): void {
    this.service.fetch(Number(this.$route.params.id))

    this.subscription.add(
      this.service.errorStream.subscribe((message) => {
        GlobalEventBus.getInstance().dispatchSnackbarEvent({
          type: 'error',
          message,
        })
      })
    )
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

  get isAwaitingPost(): boolean {
    return this.service.isAwaitingPost
  }

  get isAwaitingComments(): boolean {
    return this.service.isAwaitingComments
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
