<template>
  <div>
    <h2>Posts</h2>
    <v-btn class="mt-6 primary" @click="pushToCreatePage">+ Create Post</v-btn>
    <div class="my-10">
      <v-skeleton-loader v-if="isAwaiting" type="article" />
      <v-card
        v-for="p of posts"
        :key="p.id"
        class="my-6"
        @click="pushToDetailPage(p.id)"
      >
        <v-card-title>{{ p.title }}</v-card-title>
        <v-card-text>{{ p.body }}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import UseSubscription from '~/components/mixins/use-subscription'
import { ISamplePostModel } from '~/core/models/domain/sample'
import { SampleListPageService } from '~/core/services/sample/list'
import { SampleListUsecaseImpl } from '~/core/services/sample/list/usecases'
import { GlobalEventBus } from '~/surface/event-bus/global'

const SERVICE = new SampleListPageService(new SampleListUsecaseImpl())

@Component({
  components: {},
})
export default class PostIndexPage extends mixins(UseSubscription) {
  readonly service = SERVICE

  created(): void {
    this.service.fetch()
    this.service.errorStream
      .subscribeAsDisposable((message) => {
        GlobalEventBus.getInstance().dispatchSnackbarEvent({
          type: 'error',
          message,
        })
      })
      .disposedBy(this.subscription)
  }

  get posts(): ISamplePostModel[] {
    return this.service.slicedPosts
  }

  get isAwaiting(): boolean {
    return this.service.isAwaiting
  }

  pushToDetailPage(id: number): void {
    this.$router.push(this.$pagesPath.sample.posts._id(id).$url())
  }

  pushToCreatePage(): void {
    this.$router.push(this.$pagesPath.sample.posts.new.$url())
  }
}
</script>
