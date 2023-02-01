<template>
  <div>
    <h2 class="mb-6">Edit Post</h2>
    <v-card :loading="service.isAwaiting" :disabled="service.isAwaiting">
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field v-model="title" :rules="rules" label="title" />
          <v-text-field v-model="body" :rules="rules" label="body" />
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="primary"
            :disabled="!valid || service.isAwaiting"
            @click="submit"
            >submit</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
// .post-edit-page {}
</style>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import UseSubscription from '~/components/mixins/use-subscription'
import ErrorModel from '~/core/models/error'
import { SamplePostFindRepositoryImpl } from '~/core/repositories/sample/post/find'
import { SamplePostUpdateRepositoryImpl } from '~/core/repositories/sample/post/update'
import { SampleUpdatePageService } from '~/core/services/sample/update'
import { SamplePostId } from '~/core/values/sample/post/id'
import { GlobalEventBus } from '~/surface/event-bus/global'

@Component({
  components: {},
})
export default class PostEditPage extends mixins(UseSubscription) {
  readonly service = new SampleUpdatePageService({
    find: new SamplePostFindRepositoryImpl(),
    update: new SamplePostUpdateRepositoryImpl(),
  })

  valid = false

  title = ''
  body = ''

  readonly rules: Array<(value: string) => string | boolean> = [
    (v: string): string | boolean => !!v || 'required',
  ]

  get id(): SamplePostId {
    return SamplePostId.from(this.$route.params.id)
  }

  created(): void {
    this.fetchPost(this.id)
  }

  async fetchPost(id: SamplePostId): Promise<void> {
    const model = await this.service.fetch(id).catch((err) => {
      const { message } = new ErrorModel(err)
      GlobalEventBus.getInstance().dispatchSnackbarEvent({
        type: 'error',
        message,
      })

      return null
    })

    if (!model) {
      this.$router.push(this.$pagesPath.sample.posts.$url())
      return
    }

    this.title = model.rawValue.title
    this.body = model.rawValue.body
  }

  submit(): void {
    this.service
      .update(this.id, this.title, this.body)
      .then(() => {
        this.$router.push(this.$pagesPath.sample.posts.$url())
        GlobalEventBus.getInstance().dispatchSnackbarEvent({
          type: 'success',
          message: '投稿の更新に成功しました',
        })
      })
      .catch((err) => {
        const { message } = new ErrorModel(err)
        GlobalEventBus.getInstance().dispatchSnackbarEvent({
          type: 'error',
          message,
        })
      })
  }
}
</script>
