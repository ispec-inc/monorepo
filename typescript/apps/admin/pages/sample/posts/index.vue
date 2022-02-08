<template>
  <div>
    <h2>Posts</h2>
    <div class="my-10">
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
import { Vue, Component } from 'nuxt-property-decorator'
import { SampleListPageService } from '~/core/service/sample/list'
import { ISamplePostModel } from '~/core/model/sample'
import { SampleListUsecaseImpl } from '~/core/service/sample/list/usecases'

const SERVICE = new SampleListPageService(new SampleListUsecaseImpl())

@Component({
  components: {},
})
export default class PostIndexPage extends Vue {
  readonly service = SERVICE

  created(): void {
    this.service.fetch()
  }

  get posts(): ISamplePostModel[] {
    return this.service.slicedPosts
  }

  pushToDetailPage(id: number): void {
    this.$router.push(this.$pagesPath.sample.posts._id(id).$url())
  }
}
</script>
