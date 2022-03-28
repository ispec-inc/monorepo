<template>
  <div>
    <h2>Posts</h2>
    <v-btn class="mt-6 primary" @click="pushToCreatePage">+ Create Post</v-btn>
    <div class="my-10">
      <v-skeleton-loader v-if="service.isAwaitingFetch" type="article" />
      <v-card
        v-for="p of service.posts"
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
import ErrorModel from '~/core/models/error'
import { SamplePostFindAllRepositoryImpl } from '~/core/repositories/sample/post/find-all'
import { SampleListPageService } from '~/core/services/sample/list'
import { GlobalEventBus } from '~/surface/event-bus/global'

@Component({
  components: {},
})
export default class PostIndexPage extends mixins(UseSubscription) {
  readonly service = new SampleListPageService({
    findAll: new SamplePostFindAllRepositoryImpl(),
  })

  created(): void {
    this.fetchPosts()
  }

  fetchPosts(): void {
    this.service.fetch().catch((err) => {
      const { message } = new ErrorModel(err)
      GlobalEventBus.getInstance().dispatchSnackbarEvent({
        type: 'error',
        message,
      })
    })
  }

  pushToDetailPage(id: number): void {
    this.$router.push(this.$pagesPath.sample.posts._id(id).$url())
  }

  pushToCreatePage(): void {
    this.$router.push(this.$pagesPath.sample.posts.new.$url())
  }
}
</script>
